import type { InvitationStatus, MembershipStatus, OrganizationRole, PlatformRole } from "@/lib/domain/options";

export const organizationRoleLabels: Record<OrganizationRole, string> = {
  ORG_ADMIN: "Admin da org",
  MANAGER: "Gestor",
  OPERATOR: "Operador"
};

export const membershipStatusLabels: Record<MembershipStatus, string> = {
  ACTIVE: "Ativo",
  INVITED: "Convidado",
  SUSPENDED: "Suspenso"
};

export const invitationStatusLabels: Record<InvitationStatus, string> = {
  ACCEPTED: "Aceito",
  EXPIRED: "Expirado",
  PENDING: "Pendente",
  REVOKED: "Revogado"
};

export const platformRoleLabels: Record<PlatformRole, string> = {
  NONE: "Usuario cliente",
  PLATFORM_ADMIN: "Admin da plataforma"
};

export function canManageWorkspace(role: OrganizationRole) {
  return role === "ORG_ADMIN" || role === "MANAGER";
}

export function canConfigureWorkspace(role: OrganizationRole) {
  return role === "ORG_ADMIN";
}

export function canViewReports(role: OrganizationRole) {
  return canManageWorkspace(role);
}
