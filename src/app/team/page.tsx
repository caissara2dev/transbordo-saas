import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";

const roles = [
  {
    role: "Platform admin",
    body: "Internal operator for customer provisioning and support."
  },
  {
    role: "Org admin",
    body: "Customer admin responsible for memberships, settings, and client governance."
  },
  {
    role: "Manager",
    body: "Operational owner with reporting access and elevated event controls."
  },
  {
    role: "Operator",
    body: "Event capture user focused on execution rather than administration."
  }
];

export default function TeamPage() {
  return (
    <AppShell
      currentPath="/team"
      title="Team and access model"
      description="The SaaS replaces the single-company role model with explicit platform and organization responsibilities."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {roles.map((item) => (
          <Panel className="space-y-3" key={item.role}>
            <h3 className="font-display text-3xl text-ink-950">{item.role}</h3>
            <p className="text-sm leading-7 text-ink-700">{item.body}</p>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}
