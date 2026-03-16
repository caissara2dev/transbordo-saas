import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";
import { requireWorkspaceViewer } from "@/lib/auth/session";
import { getWorkspaceDashboardSnapshot } from "@/lib/app/workspace";

const numberFormatter = new Intl.NumberFormat("en-US");

export default async function DashboardPage() {
  const viewer = await requireWorkspaceViewer();
  const snapshot = await getWorkspaceDashboardSnapshot(viewer.activeMembership.organization.id);
  const cards = [
    {
      label: "Active members",
      value: numberFormatter.format(snapshot.activeMembers),
      note: "Operational seats already active inside this organization."
    },
    {
      label: "Pending invites",
      value: numberFormatter.format(snapshot.pendingInvites),
      note: "Invitations waiting for acceptance or manual activation."
    },
    {
      label: "Active clients",
      value: numberFormatter.format(snapshot.activeClients),
      note: "Client registry items available for governed productive events."
    },
    {
      label: "Events in 30 days",
      value: numberFormatter.format(snapshot.eventsLast30Days),
      note: `${numberFormatter.format(snapshot.productiveEventsLast30Days)} marked as productive.`
    }
  ];

  return (
    <AppShell
      viewer={viewer}
      currentPath="/dashboard"
      title="Workspace overview"
      description="This dashboard is now session-aware: it resolves the signed-in user, active organization, and live organization counts from Postgres."
    >
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card) => (
            <Panel className="space-y-3" key={card.label}>
              <p className="text-sm text-ink-600">{card.label}</p>
              <p className="font-display text-5xl leading-none text-ink-950">{card.value}</p>
              <p className="text-sm leading-6 text-ink-700">{card.note}</p>
            </Panel>
          ))}
        </div>

        <Panel className="space-y-5">
          <p className="text-xs uppercase tracking-[0.28em] text-ink-500">Current organization</p>
          <h3 className="font-display text-3xl leading-none text-ink-950">{viewer.activeMembership.organization.name}</h3>
          <div className="space-y-4 text-sm leading-7 text-ink-700">
            <p>
              The active workspace is anchored to <strong>{viewer.activeMembership.organization.slug}</strong> and{" "}
              <strong>{viewer.activeMembership.settings?.timezone ?? "America/Sao_Paulo"}</strong>.
            </p>
            <p>
              The MVP remains intentionally narrow: memberships, clients, event logging, revision history, and reports. Billing and multi-site depth stay outside the launch slice.
            </p>
          </div>
          <div className="grid gap-3">
            {[
              "Invite the first manager and operator seats.",
              "Configure approval contact details in settings.",
              "Load clients before opening productive event capture."
            ].map((item) => (
              <div className="rounded-3xl border border-ink-900/10 bg-sand-50/70 px-4 py-3 text-sm text-ink-800" key={item}>
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
