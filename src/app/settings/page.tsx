import { redirect } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";
import { canConfigureWorkspace, platformRoleLabels } from "@/lib/auth/permissions";
import { requireWorkspaceViewer } from "@/lib/auth/session";

export default async function SettingsPage() {
  const viewer = await requireWorkspaceViewer();
  if (!canConfigureWorkspace(viewer.activeMembership.role)) {
    redirect("/dashboard");
  }

  const settings = viewer.activeMembership.settings;

  return (
    <AppShell
      viewer={viewer}
      currentPath="/settings"
      title="Configuracoes"
      description="Defaults e dados institucionais da organizacao: base de onboarding, timezone operacional e contato de aprovacao."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel className="space-y-3">
          <h3 className="font-display text-3xl text-ink-950">Perfil da organizacao</h3>
          <dl className="space-y-3 text-sm leading-7 text-ink-700">
            <div>
              <dt className="text-ink-500">Nome</dt>
              <dd className="font-medium text-ink-950">{viewer.activeMembership.organization.name}</dd>
            </div>
            <div>
              <dt className="text-ink-500">Slug</dt>
              <dd className="font-medium text-ink-950">{viewer.activeMembership.organization.slug}</dd>
            </div>
            <div>
              <dt className="text-ink-500">Razao social</dt>
              <dd className="font-medium text-ink-950">{viewer.activeMembership.organization.legalName || "Nao definido"}</dd>
            </div>
            <div>
              <dt className="text-ink-500">Status</dt>
              <dd className="font-medium capitalize text-ink-950">{viewer.activeMembership.organization.status}</dd>
            </div>
          </dl>
        </Panel>
        <Panel className="space-y-3">
          <h3 className="font-display text-3xl text-ink-950">Defaults operacionais</h3>
          <dl className="space-y-3 text-sm leading-7 text-ink-700">
            <div>
              <dt className="text-ink-500">Timezone</dt>
              <dd className="font-medium text-ink-950">{settings?.timezone || "America/Sao_Paulo"}</dd>
            </div>
            <div>
              <dt className="text-ink-500">Contato de aprovacao</dt>
              <dd className="font-medium text-ink-950">{settings?.approvalContactPhone || "Nao configurado"}</dd>
            </div>
            <div>
              <dt className="text-ink-500">Rotulo operacional</dt>
              <dd className="font-medium text-ink-950">{settings?.operationsLabel || "Transbordo"}</dd>
            </div>
            <div>
              <dt className="text-ink-500">Acesso de plataforma</dt>
              <dd className="font-medium text-ink-950">{platformRoleLabels[viewer.profile.platformRole]}</dd>
            </div>
          </dl>
        </Panel>
      </div>
    </AppShell>
  );
}
