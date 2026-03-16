import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import {
  organizations,
  organizationMemberships,
  organizationSettings,
  userProfiles
} from "@/lib/db/schema";
import { getOptionalSupabaseServerClient } from "@/lib/supabase/server";
import { getDemoSessionResolution, isDemoModeEnabled } from "@/lib/demo";
import type { SessionResolution, ViewerContext, ViewerProfile, WorkspaceViewer } from "@/types/app";

function readFullName(metadata: unknown) {
  if (!metadata || typeof metadata !== "object") {
    return null;
  }

  const fullName = "full_name" in metadata ? metadata.full_name : undefined;
  const name = "name" in metadata ? metadata.name : undefined;
  const firstName = "first_name" in metadata ? metadata.first_name : undefined;
  const lastName = "last_name" in metadata ? metadata.last_name : undefined;

  if (typeof fullName === "string" && fullName.trim()) {
    return fullName.trim();
  }

  if (typeof name === "string" && name.trim()) {
    return name.trim();
  }

  const fallback = [firstName, lastName].filter((value): value is string => typeof value === "string" && Boolean(value.trim())).join(" ");
  return fallback || null;
}

async function syncViewerProfile(userId: string, email: string, fullName: string | null): Promise<ViewerProfile> {
  const db = getDb();
  const [profile] = await db
    .insert(userProfiles)
    .values({
      id: userId,
      email,
      fullName,
      updatedAt: new Date()
    })
    .onConflictDoUpdate({
      target: userProfiles.id,
      set: {
        email,
        fullName,
        updatedAt: new Date()
      }
    })
    .returning({
      id: userProfiles.id,
      email: userProfiles.email,
      fullName: userProfiles.fullName,
      platformRole: userProfiles.platformRole
    });

  return profile;
}

export async function getSessionResolution(): Promise<SessionResolution> {
  noStore();

  if (isDemoModeEnabled()) {
    return getDemoSessionResolution();
  }

  const supabase = await getOptionalSupabaseServerClient();
  if (!supabase) {
    return { state: "unconfigured" };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { state: "signed_out" };
  }

  const profile = await syncViewerProfile(user.id, user.email, readFullName(user.user_metadata));
  const db = getDb();
  const rows = await db
    .select({
      membershipId: organizationMemberships.id,
      role: organizationMemberships.role,
      status: organizationMemberships.status,
      joinedAt: organizationMemberships.joinedAt,
      organizationId: organizations.id,
      organizationName: organizations.name,
      organizationSlug: organizations.slug,
      organizationLegalName: organizations.legalName,
      organizationStatus: organizations.status,
      timezone: organizationSettings.timezone,
      approvalContactPhone: organizationSettings.approvalContactPhone,
      operationsLabel: organizationSettings.operationsLabel
    })
    .from(organizationMemberships)
    .innerJoin(organizations, eq(organizationMemberships.organizationId, organizations.id))
    .leftJoin(organizationSettings, eq(organizationSettings.organizationId, organizations.id))
    .where(eq(organizationMemberships.userId, user.id))
    .orderBy(asc(organizations.name), asc(organizationMemberships.createdAt));

  const memberships: ViewerContext["memberships"] = rows.map((row) => ({
    id: row.membershipId,
    role: row.role,
    status: row.status,
    joinedAt: row.joinedAt,
    organization: {
      id: row.organizationId,
      name: row.organizationName,
      slug: row.organizationSlug,
      legalName: row.organizationLegalName,
      status: row.organizationStatus
    },
    settings: row.timezone
      ? {
          organizationId: row.organizationId,
          timezone: row.timezone,
          approvalContactPhone: row.approvalContactPhone,
          operationsLabel: row.operationsLabel ?? "Transbordo"
        }
      : null
  }));

  const activeMembership = memberships.find((membership) => membership.status === "ACTIVE") ?? null;

  return {
    state: "authenticated",
    viewer: {
      isDemo: false,
      authUser: {
        id: user.id,
        email: user.email
      },
      profile,
      memberships,
      activeMembership
    }
  };
}

export async function requireAuthenticatedViewer() {
  const session = await getSessionResolution();

  if (session.state === "unconfigured") {
    redirect("/login?error=setup");
  }

  if (session.state === "signed_out") {
    redirect("/login");
  }

  return session.viewer;
}

export async function requireWorkspaceViewer(): Promise<WorkspaceViewer> {
  const viewer = await requireAuthenticatedViewer();

  if (!viewer.activeMembership) {
    redirect("/pending-access" as never);
  }

  return viewer as WorkspaceViewer;
}
