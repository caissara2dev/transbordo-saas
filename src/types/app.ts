import type { MembershipStatus, OrganizationRole, PlatformRole } from "@/lib/domain/options";

export type OrganizationSummary = {
  id: string;
  name: string;
  slug: string;
  legalName: string | null;
  status: string;
};

export type OrganizationSettingsSummary = {
  organizationId: string;
  timezone: string;
  approvalContactPhone: string | null;
  operationsLabel: string;
};

export type ViewerProfile = {
  id: string;
  email: string;
  fullName: string | null;
  platformRole: PlatformRole;
};

export type ViewerMembership = {
  id: string;
  role: OrganizationRole;
  status: MembershipStatus;
  joinedAt: Date | null;
  organization: OrganizationSummary;
  settings: OrganizationSettingsSummary | null;
};

export type ViewerContext = {
  authUser: {
    id: string;
    email: string;
  };
  profile: ViewerProfile;
  memberships: ViewerMembership[];
  activeMembership: ViewerMembership | null;
};

export type SessionResolution =
  | {
      state: "unconfigured";
    }
  | {
      state: "signed_out";
    }
  | {
      state: "authenticated";
      viewer: ViewerContext;
    };

export type WorkspaceViewer = ViewerContext & {
  activeMembership: ViewerMembership;
};
