export const pumps = ["LINE_01", "LINE_02"] as const;
export type Pump = (typeof pumps)[number];

export const shiftTypes = ["MORNING", "NIGHT"] as const;
export type ShiftType = (typeof shiftTypes)[number];

export const categories = [
  "PRODUCTIVE",
  "IN_TRANSIT",
  "WAITING_LAB",
  "NO_TRUCK",
  "NO_CONTAINER",
  "MAINTENANCE",
  "OTHER"
] as const;

export type Category = (typeof categories)[number];

export const organizationRoles = ["ORG_ADMIN", "MANAGER", "OPERATOR"] as const;
export type OrganizationRole = (typeof organizationRoles)[number];

export const platformRoles = ["NONE", "PLATFORM_ADMIN"] as const;
export type PlatformRole = (typeof platformRoles)[number];

export const membershipStatuses = ["INVITED", "ACTIVE", "SUSPENDED"] as const;
export type MembershipStatus = (typeof membershipStatuses)[number];

export const invitationStatuses = ["PENDING", "ACCEPTED", "REVOKED", "EXPIRED"] as const;
export type InvitationStatus = (typeof invitationStatuses)[number];

export const categoryLabels: Record<Category, string> = {
  PRODUCTIVE: "Productive",
  IN_TRANSIT: "In Transit",
  WAITING_LAB: "Waiting for Lab",
  NO_TRUCK: "No Truck",
  NO_CONTAINER: "No Container",
  MAINTENANCE: "Maintenance",
  OTHER: "Other"
};
