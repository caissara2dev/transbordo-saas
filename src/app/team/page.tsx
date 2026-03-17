import { redirect } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";
import {
  canConfigureWorkspace,
  invitationStatusLabels,
  membershipStatusLabels,
  organizationRoleLabels
} from "@/lib/auth/permissions";
import { requireWorkspaceViewer } from "@/lib/auth/session";
import { getOrganizationTeam } from "@/lib/app/workspace";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "medium"
});

export default async function TeamPage() {
  const viewer = await requireWorkspaceViewer();
  if (!canConfigureWorkspace(viewer.activeMembership.role)) {
    redirect("/dashboard");
  }

  const { memberships, invitations } = await getOrganizationTeam(viewer.activeMembership.organization.id);

  return (
    <AppShell
      viewer={viewer}
      currentPath="/team"
      title="Usuarios"
      description="Gestao de acessos da organizacao, com membros ativos, convites pendentes e papeis operacionais definidos por tenant."
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-ink-500">Membros ativos</p>
            <h3 className="font-display text-3xl text-ink-950">Papeis da organizacao com status explicito.</h3>
          </div>
          <div className="space-y-3">
            {memberships.length === 0 ? (
              <div className="rounded-3xl border border-ink-900/10 bg-sand-50/70 p-4 text-sm text-ink-700">
                Nenhum membro encontrado para esta organizacao.
              </div>
            ) : (
              memberships.map((member) => (
                <div className="flex flex-col gap-3 rounded-3xl border border-ink-900/10 bg-sand-50/70 p-4 sm:flex-row sm:items-center sm:justify-between" key={member.id}>
                  <div>
                    <p className="font-semibold text-ink-950">{member.fullName || member.email}</p>
                    <p className="text-sm text-ink-700">{member.email}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em]">
                    <span className="rounded-full border border-ink-900/10 bg-white px-3 py-2 text-ink-700">
                      {organizationRoleLabels[member.role]}
                    </span>
                    <span className="rounded-full border border-ink-900/10 bg-white px-3 py-2 text-ink-700">
                      {membershipStatusLabels[member.status]}
                    </span>
                    <span className="rounded-full border border-ink-900/10 bg-white px-3 py-2 text-ink-700">
                      {member.joinedAt ? dateFormatter.format(member.joinedAt) : "Nao ingressou"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Panel>

        <Panel className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-ink-500">Fila de convites</p>
            <h3 className="font-display text-3xl text-ink-950">Acesso pendente continua sendo estado de primeira classe.</h3>
          </div>
          <div className="space-y-3">
            {invitations.length === 0 ? (
              <div className="rounded-3xl border border-ink-900/10 bg-sand-50/70 p-4 text-sm text-ink-700">
                Nenhum convite emitido ate agora.
              </div>
            ) : (
              invitations.map((invite) => (
                <div className="rounded-3xl border border-ink-900/10 bg-sand-50/70 p-4" key={invite.id}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ink-950">{invite.email}</p>
                      <p className="text-sm text-ink-700">{organizationRoleLabels[invite.role]}</p>
                    </div>
                    <span className="rounded-full border border-ink-900/10 bg-white px-3 py-2 text-xs uppercase tracking-[0.18em] text-ink-700">
                      {invitationStatusLabels[invite.status]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-ink-700">
                    Criado em {dateFormatter.format(invite.createdAt)}
                    {invite.expiresAt ? ` · Expira em ${dateFormatter.format(invite.expiresAt)}` : ""}
                  </p>
                </div>
              ))
            )}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
