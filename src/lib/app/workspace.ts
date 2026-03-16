import { and, asc, count, desc, eq, gte } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import {
  clients,
  events,
  eventRevisions,
  organizationInvitations,
  organizationMemberships,
  userProfiles
} from "@/lib/db/schema";

function formatDateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}

function subtractDays(date: Date, days: number) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() - days);
  return copy;
}

export async function getWorkspaceDashboardSnapshot(organizationId: string) {
  const db = getDb();
  const since = formatDateInput(subtractDays(new Date(), 30));

  const [
    [membersRow],
    [invitesRow],
    [clientsRow],
    [eventsRow],
    [productiveRow]
  ] = await Promise.all([
    db
      .select({ value: count() })
      .from(organizationMemberships)
      .where(and(eq(organizationMemberships.organizationId, organizationId), eq(organizationMemberships.status, "ACTIVE"))),
    db
      .select({ value: count() })
      .from(organizationInvitations)
      .where(and(eq(organizationInvitations.organizationId, organizationId), eq(organizationInvitations.status, "PENDING"))),
    db
      .select({ value: count() })
      .from(clients)
      .where(and(eq(clients.organizationId, organizationId), eq(clients.active, true))),
    db
      .select({ value: count() })
      .from(events)
      .where(and(eq(events.organizationId, organizationId), eq(events.deleted, false), gte(events.shiftDate, since))),
    db
      .select({ value: count() })
      .from(events)
      .where(
        and(
          eq(events.organizationId, organizationId),
          eq(events.deleted, false),
          eq(events.productive, true),
          gte(events.shiftDate, since)
        )
      )
  ]);

  return {
    activeMembers: membersRow?.value ?? 0,
    pendingInvites: invitesRow?.value ?? 0,
    activeClients: clientsRow?.value ?? 0,
    eventsLast30Days: eventsRow?.value ?? 0,
    productiveEventsLast30Days: productiveRow?.value ?? 0
  };
}

export async function getOrganizationClients(organizationId: string) {
  const db = getDb();
  return db
    .select({
      id: clients.id,
      name: clients.name,
      active: clients.active,
      updatedAt: clients.updatedAt
    })
    .from(clients)
    .where(eq(clients.organizationId, organizationId))
    .orderBy(asc(clients.name));
}

export async function getOrganizationTeam(organizationId: string) {
  const db = getDb();
  const [memberships, invitations] = await Promise.all([
    db
      .select({
        id: organizationMemberships.id,
        role: organizationMemberships.role,
        status: organizationMemberships.status,
        joinedAt: organizationMemberships.joinedAt,
        email: userProfiles.email,
        fullName: userProfiles.fullName
      })
      .from(organizationMemberships)
      .innerJoin(userProfiles, eq(organizationMemberships.userId, userProfiles.id))
      .where(eq(organizationMemberships.organizationId, organizationId))
      .orderBy(asc(organizationMemberships.role), asc(userProfiles.email)),
    db
      .select({
        id: organizationInvitations.id,
        email: organizationInvitations.email,
        role: organizationInvitations.role,
        status: organizationInvitations.status,
        createdAt: organizationInvitations.createdAt,
        expiresAt: organizationInvitations.expiresAt
      })
      .from(organizationInvitations)
      .where(eq(organizationInvitations.organizationId, organizationId))
      .orderBy(desc(organizationInvitations.createdAt))
  ]);

  return { memberships, invitations };
}

export async function getGovernanceSnapshot(organizationId: string) {
  const db = getDb();
  const [[eventsRow], [deletedRow], [revisionsRow], recentRevisions] = await Promise.all([
    db.select({ value: count() }).from(events).where(eq(events.organizationId, organizationId)),
    db
      .select({ value: count() })
      .from(events)
      .where(and(eq(events.organizationId, organizationId), eq(events.deleted, true))),
    db.select({ value: count() }).from(eventRevisions).where(eq(eventRevisions.organizationId, organizationId)),
    db
      .select({
        id: eventRevisions.id,
        editedAt: eventRevisions.editedAt,
        reason: eventRevisions.reason,
        changedFields: eventRevisions.changedFields,
        actorEmail: userProfiles.email,
        actorName: userProfiles.fullName
      })
      .from(eventRevisions)
      .innerJoin(
        organizationMemberships,
        eq(eventRevisions.editedByMembershipId, organizationMemberships.id)
      )
      .innerJoin(userProfiles, eq(organizationMemberships.userId, userProfiles.id))
      .where(eq(eventRevisions.organizationId, organizationId))
      .orderBy(desc(eventRevisions.editedAt))
      .limit(5)
  ]);

  return {
    totalEvents: eventsRow?.value ?? 0,
    deletedEvents: deletedRow?.value ?? 0,
    revisions: revisionsRow?.value ?? 0,
    recentRevisions
  };
}
