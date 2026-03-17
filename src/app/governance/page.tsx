import { redirect } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";
import { canManageWorkspace } from "@/lib/auth/permissions";
import { requireWorkspaceViewer } from "@/lib/auth/session";
import { getGovernanceSnapshot } from "@/lib/app/workspace";

const numberFormatter = new Intl.NumberFormat("pt-BR");
const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "medium",
  timeStyle: "short"
});

export default async function GovernancePage() {
  const viewer = await requireWorkspaceViewer();
  if (!canManageWorkspace(viewer.activeMembership.role)) {
    redirect("/dashboard");
  }

  const snapshot = await getGovernanceSnapshot(viewer.activeMembership.organization.id);

  return (
    <AppShell
      viewer={viewer}
      currentPath="/governance"
      title="Governanca e auditoria"
      description="Camada de rastreabilidade do produto: revisoes, ownership de eventos e evidencias operacionais por organizacao."
    >
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <Panel className="space-y-4">
          <h3 className="font-display text-3xl text-ink-950">Pegada auditavel da operacao</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-ink-900/10 bg-sand-50/70 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-ink-500">Eventos</p>
              <p className="mt-2 font-display text-4xl leading-none text-ink-950">{numberFormatter.format(snapshot.totalEvents)}</p>
            </div>
            <div className="rounded-3xl border border-ink-900/10 bg-sand-50/70 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-ink-500">Excluidos</p>
              <p className="mt-2 font-display text-4xl leading-none text-ink-950">{numberFormatter.format(snapshot.deletedEvents)}</p>
            </div>
            <div className="rounded-3xl border border-ink-900/10 bg-sand-50/70 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-ink-500">Revisoes</p>
              <p className="mt-2 font-display text-4xl leading-none text-ink-950">{numberFormatter.format(snapshot.revisions)}</p>
            </div>
          </div>
          <p className="text-sm leading-7 text-ink-700">
            Soft delete, historico de revisoes e ownership explicito continuam sendo valor central do produto. Os numeros acima ja saem do escopo real da organizacao.
          </p>
        </Panel>
        <Panel className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-ink-500">Atividade recente</p>
          <h3 className="font-display text-4xl leading-none text-ink-950">Fluxos governados antes da hiperconfiguracao.</h3>
          {snapshot.recentRevisions.length === 0 ? (
            <p className="text-sm leading-7 text-ink-700">Nenhuma revisao de evento foi registrada para esta organizacao.</p>
          ) : (
            <div className="space-y-3">
              {snapshot.recentRevisions.map((revision) => (
                <div className="rounded-3xl border border-ink-900/10 bg-sand-50/70 p-4" key={revision.id}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-ink-950">{revision.actorName || revision.actorEmail}</p>
                    <span className="text-xs uppercase tracking-[0.18em] text-ink-500">
                      {dateFormatter.format(revision.editedAt)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink-700">
                    {revision.changedFields.length > 0 ? revision.changedFields.join(", ") : "Lista de campos pendente"}
                  </p>
                  {revision.reason ? <p className="mt-2 text-sm leading-7 text-ink-700">{revision.reason}</p> : null}
                </div>
              ))}
            </div>
          )}
        </Panel>
      </div>
    </AppShell>
  );
}
