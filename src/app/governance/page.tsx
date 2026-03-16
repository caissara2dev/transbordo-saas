import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";

export default function GovernancePage() {
  return (
    <AppShell
      currentPath="/governance"
      title="Governance and audit"
      description="Auditability is not an afterthought. Revision history, role changes, and event ownership remain explicit product value."
    >
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <Panel className="space-y-4">
          <h3 className="font-display text-3xl text-ink-950">What remains non-negotiable</h3>
          <ul className="space-y-3 text-sm leading-7 text-ink-700">
            <li>Shift event edits generate revision artifacts.</li>
            <li>Delete and restore actions stay auditable.</li>
            <li>Managers and org admins operate under explicit permissions.</li>
            <li>Operational reports reflect the same governed data model.</li>
          </ul>
        </Panel>
        <Panel className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-ink-500">V1 product line</p>
          <h3 className="font-display text-4xl leading-none text-ink-950">Governed workflows before configurability.</h3>
          <p className="text-sm leading-7 text-ink-700">
            The rebuild prioritizes trustworthy operations over broad customization. That keeps the SaaS sellable, teachable, and supportable in the first release.
          </p>
        </Panel>
      </div>
    </AppShell>
  );
}
