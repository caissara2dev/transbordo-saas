import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";

const workflow = [
  "Operator captures a governed event against a fixed asset line.",
  "Manager reviews overlap conflicts and audit history.",
  "Productive versus idle categories feed report aggregates.",
  "Soft delete and revision metadata remain explicit product features."
];

export default function OperationsPage() {
  return (
    <AppShell
      currentPath="/operations"
      title="Operations workflow"
      description="The operational core stays product-specific: event logging, overlap protection, revision history, and accountable shift workflows."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Panel className="space-y-5">
          <h3 className="font-display text-3xl text-ink-950">Event model retained from the domain.</h3>
          <div className="space-y-4 text-sm leading-7 text-ink-700">
            <p>The rebuild keeps the proven business mechanics from the current product while rewrapping them in an org-aware SaaS architecture.</p>
            <p>The first release intentionally keeps fixed lines, categories, and shift logic to reduce configuration burden and launch risk.</p>
          </div>
        </Panel>
        <Panel className="space-y-4">
          {workflow.map((item, index) => (
            <div className="rounded-3xl border border-ink-900/10 bg-sand-50/60 p-4" key={item}>
              <p className="text-xs uppercase tracking-[0.24em] text-ink-500">Step {index + 1}</p>
              <p className="mt-2 text-sm leading-7 text-ink-800">{item}</p>
            </div>
          ))}
        </Panel>
      </div>
    </AppShell>
  );
}
