import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";
import { categoryLabels, pumps, shiftTypes } from "@/lib/domain/options";
import { requireWorkspaceViewer } from "@/lib/auth/session";
import { canManageWorkspace, organizationRoleLabels } from "@/lib/auth/permissions";

export default async function LancamentosPage() {
  const viewer = await requireWorkspaceViewer();
  const managerAccess = canManageWorkspace(viewer.activeMembership.role);

  return (
    <AppShell
      viewer={viewer}
      currentPath="/lancamentos"
      title="Lancamentos operacionais"
      description="Esta area representa a tela em que o operador faz os lancamentos de eventos, com categorias fixas, turnos definidos e guardrails de governanca."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Panel className="space-y-5">
          <h3 className="font-display text-3xl text-ink-950">Area principal do operador.</h3>
          <div className="space-y-4 text-sm leading-7 text-ink-700">
            <p>
              {organizationRoleLabels[viewer.activeMembership.role]} access is currently active for this workspace. Operators keep the capture surface lean; managers and org admins retain review and governance authority.
            </p>
            <p>The first release intentionally keeps fixed lines, categories, and shift logic to reduce configuration burden and launch risk.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-ink-900/10 bg-sand-50/70 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-ink-500">Linhas fixas</p>
              <p className="mt-2 text-lg font-semibold text-ink-950">{pumps.join(" · ")}</p>
            </div>
            <div className="rounded-3xl border border-ink-900/10 bg-sand-50/70 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-ink-500">Turnos</p>
              <p className="mt-2 text-lg font-semibold text-ink-950">{shiftTypes.join(" · ")}</p>
            </div>
          </div>
        </Panel>
        <Panel className="space-y-4">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <div className="rounded-3xl border border-ink-900/10 bg-sand-50/60 p-4" key={key}>
              <p className="text-xs uppercase tracking-[0.24em] text-ink-500">{key.replaceAll("_", " ")}</p>
              <p className="mt-2 text-sm leading-7 text-ink-800">
                {label}
                {key === "PRODUCTIVE" ? " events require client, plate, and container context." : " remains available as a governed idle-state category."}
              </p>
            </div>
          ))}
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-ink-500">Access boundaries</p>
          <h3 className="font-display text-3xl text-ink-950">
            {managerAccess ? "Review and correction authority is enabled." : "This seat is capture-first by design."}
          </h3>
          <p className="text-sm leading-7 text-ink-700">
            Managers and org admins are the only roles that should eventually receive edit-review, dispute handling, and advanced governance controls. Operators remain focused on accurate capture at the edge.
          </p>
        </Panel>
        <Panel className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-ink-500">Next build slice</p>
          <p className="text-sm leading-7 text-ink-700">
            The next operational milestone is replacing these domain cards with the real event board, overlap checks, and revision-aware create/edit flows.
          </p>
        </Panel>
      </div>
    </AppShell>
  );
}
