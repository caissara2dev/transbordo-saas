import type {
  Category,
  InvitationStatus,
  MembershipStatus,
  OrganizationRole,
  PlatformRole,
  Pump,
  ShiftType
} from "@/lib/domain/options";

export type UserProfile = {
  id: string;
  email: string;
  fullName: string | null;
  platformRole: PlatformRole;
};

export type Organization = {
  id: string;
  name: string;
  slug: string;
  legalName: string | null;
  status: string;
};

export type OrganizationMembership = {
  id: string;
  organizationId: string;
  userId: string;
  role: OrganizationRole;
  status: MembershipStatus;
};

export type OrganizationInvitation = {
  id: string;
  organizationId: string;
  email: string;
  role: OrganizationRole;
  status: InvitationStatus;
};

export type Client = {
  id: string;
  organizationId: string;
  name: string;
  nameUpper: string;
  active: boolean;
};

export type Event = {
  id: string;
  organizationId: string;
  pump: Pump;
  shiftDate: string;
  shiftType: ShiftType;
  startTime: string;
  endTime: string;
  category: Category;
  productive: boolean;
  clientId: string | null;
  clientNameSnapshot: string | null;
  durationMinutes: number;
  deleted: boolean;
};
