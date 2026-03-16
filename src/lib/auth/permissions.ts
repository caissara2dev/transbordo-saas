import type { InvitationStatus, MembershipStatus, OrganizationRole, PlatformRole } from "@/lib/domain/options";

export const organizationRoleLabels: Record<OrganizationRole, string> = {
  ORG_ADMIN: "Org Admin",
  MANAGER: "Manager",
  OPERATOR: "Operator"
};

export const membershipStatusLabels: Record<MembershipStatus, string> = {
  ACTIVE: "Active",
  INVITED: "Invited",
  SUSPENDED: "Suspended"
};

export const invitationStatusLabels: Record<InvitationStatus, string> = {
  ACCEPTED: "Accepted",
  EXPIRED: "Expired",
  PENDING: "Pending",
  REVOKED: "Revoked"
};

export const platformRoleLabels: Record<PlatformRole, string> = {
  NONE: "Customer User",
  PLATFORM_ADMIN: "Platform Admin"
};

export function canManageWorkspace(role: OrganizationRole) {
  return role === "ORG_ADMIN" || role === "MANAGER";
}

export function canConfigureWorkspace(role: OrganizationRole) {
  return role === "ORG_ADMIN";
}
