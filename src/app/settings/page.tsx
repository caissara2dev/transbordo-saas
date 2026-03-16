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
      title="Organization settings"
      description="Settings will anchor the manual onboarding flow in v1: organization profile, timezone, and approval contact details."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel className="space-y-3">
          <h3 className="font-display text-3xl text-ink-950">Organization profile</h3>
          <dl className="space-y-3 text-sm leading-7 text-ink-700">
            <div>
              <dt className="text-ink-500">Name</dt>
              <dd className="font-medium text-ink-950">{viewer.activeMembership.organization.name}</dd>
            </div>
            <div>
              <dt className="text-ink-500">Slug</dt>
              <dd className="font-medium text-ink-950">{viewer.activeMembership.organization.slug}</dd>
            </div>
            <div>
              <dt className="text-ink-500">Legal name</dt>
              <dd className="font-medium text-ink-950">{viewer.activeMembership.organization.legalName || "Not set"}</dd>
            </div>
            <div>
              <dt className="text-ink-500">Status</dt>
              <dd className="font-medium capitalize text-ink-950">{viewer.activeMembership.organization.status}</dd>
            </div>
          </dl>
        </Panel>
        <Panel className="space-y-3">
          <h3 className="font-display text-3xl text-ink-950">Operational defaults</h3>
          <dl className="space-y-3 text-sm leading-7 text-ink-700">
            <div>
              <dt className="text-ink-500">Timezone</dt>
              <dd className="font-medium text-ink-950">{settings?.timezone || "America/Sao_Paulo"}</dd>
            </div>
            <div>
              <dt className="text-ink-500">Approval contact</dt>
              <dd className="font-medium text-ink-950">{settings?.approvalContactPhone || "Not configured"}</dd>
            </div>
            <div>
              <dt className="text-ink-500">Operations label</dt>
              <dd className="font-medium text-ink-950">{settings?.operationsLabel || "Transbordo"}</dd>
            </div>
            <div>
              <dt className="text-ink-500">Platform access</dt>
              <dd className="font-medium text-ink-950">{platformRoleLabels[viewer.profile.platformRole]}</dd>
            </div>
          </dl>
        </Panel>
      </div>
    </AppShell>
  );
}
