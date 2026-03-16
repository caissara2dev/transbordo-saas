import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";

const cards = [
  { label: "Organizations onboarded", value: "03", note: "Manual sales-led provisioning" },
  { label: "Active operator seats", value: "42", note: "Demo metric for foundation UI" },
  { label: "Shift events today", value: "186", note: "Previewing future live KPIs" },
  { label: "Idle minutes captured", value: "1,240", note: "Operational reporting baseline" }
];

export default function DashboardPage() {
  return (
    <AppShell
      currentPath="/dashboard"
      title="Workspace overview"
      description="This preview shell is the baseline for the manager/admin experience in the SaaS rebuild."
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
          <p className="text-xs uppercase tracking-[0.28em] text-ink-500">Launch frame</p>
          <h3 className="font-display text-3xl leading-none text-ink-950">Core ops + reports first.</h3>
          <div className="space-y-4 text-sm leading-7 text-ink-700">
            <p>V1 is intentionally narrow: organizations, governed team access, clients, event logging, revision history, and reporting.</p>
            <p>Billing, multi-site operations, and customer-configurable taxonomies are deliberately held back until the product proves its operational fit.</p>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
