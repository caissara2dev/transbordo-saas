import type {
  SessionResolution,
  ViewerContext,
  WorkspaceViewer
} from "@/types/app";

export function isDemoModeEnabled() {
  return process.env.APP_DEMO_MODE === "true";
}

const demoViewer: WorkspaceViewer = {
  isDemo: true,
  authUser: {
    id: "demo-user-auth",
    email: "matheus@caissara.demo"
  },
  profile: {
    id: "demo-user-auth",
    email: "matheus@caissara.demo",
    fullName: "Matheus Raimundo",
    platformRole: "PLATFORM_ADMIN"
  },
  memberships: [
    {
      id: "demo-membership-admin",
      role: "ORG_ADMIN",
      status: "ACTIVE",
      joinedAt: new Date("2026-03-01T12:00:00.000Z"),
      organization: {
        id: "demo-org-caissara",
        name: "Caissara Terminal Operations",
        slug: "caissara-terminal",
        legalName: "Caissara Terminal Operations Ltda.",
        status: "active"
      },
      settings: {
        organizationId: "demo-org-caissara",
        timezone: "America/Sao_Paulo",
        approvalContactPhone: "+55 13 99711-2838",
        operationsLabel: "Transbordo"
      }
    }
  ],
  activeMembership: {
    id: "demo-membership-admin",
    role: "ORG_ADMIN",
    status: "ACTIVE",
    joinedAt: new Date("2026-03-01T12:00:00.000Z"),
    organization: {
      id: "demo-org-caissara",
      name: "Caissara Terminal Operations",
      slug: "caissara-terminal",
      legalName: "Caissara Terminal Operations Ltda.",
      status: "active"
    },
    settings: {
      organizationId: "demo-org-caissara",
      timezone: "America/Sao_Paulo",
      approvalContactPhone: "+55 13 99711-2838",
      operationsLabel: "Transbordo"
    }
  }
};

export function getDemoSessionResolution(): SessionResolution {
  return {
    state: "authenticated",
    viewer: demoViewer
  };
}

export function getDemoViewer(): ViewerContext {
  return demoViewer;
}

export function getDemoWorkspaceViewer(): WorkspaceViewer {
  return demoViewer;
}

export function getDemoWorkspaceDashboardSnapshot() {
  return {
    activeMembers: 12,
    pendingInvites: 3,
    activeClients: 18,
    eventsLast30Days: 486,
    productiveEventsLast30Days: 301
  };
}

export function getDemoClients() {
  return [
    {
      id: "demo-client-1",
      name: "Usina Atlantica",
      active: true,
      updatedAt: new Date("2026-03-15T12:00:00.000Z")
    },
    {
      id: "demo-client-2",
      name: "Terminal 07",
      active: true,
      updatedAt: new Date("2026-03-12T12:00:00.000Z")
    },
    {
      id: "demo-client-3",
      name: "Operacao Norte",
      active: false,
      updatedAt: new Date("2026-03-09T12:00:00.000Z")
    }
  ];
}

export function getDemoTeam() {
  return {
    memberships: [
      {
        id: "demo-membership-admin",
        role: "ORG_ADMIN" as const,
        status: "ACTIVE" as const,
        joinedAt: new Date("2026-03-01T12:00:00.000Z"),
        email: "matheus@caissara.demo",
        fullName: "Matheus Raimundo"
      },
      {
        id: "demo-membership-manager",
        role: "MANAGER" as const,
        status: "ACTIVE" as const,
        joinedAt: new Date("2026-03-02T12:00:00.000Z"),
        email: "supervisao@caissara.demo",
        fullName: "Supervisao de Patio"
      },
      {
        id: "demo-membership-operator",
        role: "OPERATOR" as const,
        status: "ACTIVE" as const,
        joinedAt: new Date("2026-03-04T12:00:00.000Z"),
        email: "operador.turno@caissara.demo",
        fullName: "Operador Turno A"
      }
    ],
    invitations: [
      {
        id: "demo-invite-1",
        email: "gestao@caissara.demo",
        role: "MANAGER" as const,
        status: "PENDING" as const,
        createdAt: new Date("2026-03-14T12:00:00.000Z"),
        expiresAt: new Date("2026-03-21T12:00:00.000Z")
      },
      {
        id: "demo-invite-2",
        email: "operador.turnob@caissara.demo",
        role: "OPERATOR" as const,
        status: "PENDING" as const,
        createdAt: new Date("2026-03-13T12:00:00.000Z"),
        expiresAt: new Date("2026-03-20T12:00:00.000Z")
      }
    ]
  };
}

export function getDemoGovernanceSnapshot() {
  return {
    totalEvents: 2486,
    deletedEvents: 17,
    revisions: 93,
    recentRevisions: [
      {
        id: "demo-revision-1",
        editedAt: new Date("2026-03-16T14:40:00.000Z"),
        reason: "Adjusted container after supervisor verification.",
        changedFields: ["container", "notes"],
        actorEmail: "supervisao@caissara.demo",
        actorName: "Supervisao de Patio"
      },
      {
        id: "demo-revision-2",
        editedAt: new Date("2026-03-16T11:12:00.000Z"),
        reason: "Corrected event end time after operator handoff.",
        changedFields: ["endTime", "durationMinutes"],
        actorEmail: "matheus@caissara.demo",
        actorName: "Matheus Raimundo"
      }
    ]
  };
}
