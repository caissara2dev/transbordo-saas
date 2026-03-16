import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";

export default function ClientsPage() {
  return (
    <AppShell
      currentPath="/clients"
      title="Customer client registry"
      description="Each organization manages its own active client list for productive transbordo events and downstream reporting."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {["Usina Atlântica", "Terminal 07", "Operação Norte"].map((name) => (
          <Panel className="space-y-3" key={name}>
            <p className="text-xs uppercase tracking-[0.28em] text-ink-500">Client</p>
            <h3 className="font-display text-2xl text-ink-950">{name}</h3>
            <p className="text-sm leading-7 text-ink-700">Org-scoped registry item. Final CRUD, search, and lifecycle controls will live here.</p>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}
