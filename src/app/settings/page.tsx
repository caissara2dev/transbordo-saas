import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";

export default function SettingsPage() {
  return (
    <AppShell
      currentPath="/settings"
      title="Organization settings"
      description="Settings will anchor the manual onboarding flow in v1: organization profile, timezone, and approval contact details."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel className="space-y-3">
          <h3 className="font-display text-3xl text-ink-950">Organization profile</h3>
          <p className="text-sm leading-7 text-ink-700">Name, slug, legal entity details, and status controls for each customer organization.</p>
        </Panel>
        <Panel className="space-y-3">
          <h3 className="font-display text-3xl text-ink-950">Operational defaults</h3>
          <p className="text-sm leading-7 text-ink-700">Timezone, approval contact phone, and product terminology that shape the workspace.</p>
        </Panel>
      </div>
    </AppShell>
  );
}
