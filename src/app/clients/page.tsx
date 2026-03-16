import { redirect } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";
import { canManageWorkspace } from "@/lib/auth/permissions";
import { requireWorkspaceViewer } from "@/lib/auth/session";
import { getOrganizationClients } from "@/lib/app/workspace";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium"
});

export default async function ClientsPage() {
  const viewer = await requireWorkspaceViewer();
  if (!canManageWorkspace(viewer.activeMembership.role)) {
    redirect("/dashboard");
  }

  const records = await getOrganizationClients(viewer.activeMembership.organization.id);

  return (
    <AppShell
      viewer={viewer}
      currentPath="/clients"
      title="Customer client registry"
      description="Each organization manages its own active client list for productive transbordo events and downstream reporting."
    >
      {records.length === 0 ? (
        <Panel className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-ink-500">Registry empty</p>
          <h3 className="font-display text-3xl text-ink-950">No clients loaded yet.</h3>
          <p className="max-w-2xl text-sm leading-7 text-ink-700">
            Productive events depend on an org-scoped client registry. This empty state is expected for a brand-new customer workspace.
          </p>
        </Panel>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {records.map((client) => (
            <Panel className="space-y-3" key={client.id}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.28em] text-ink-500">Client</p>
                <span className="rounded-full border border-ink-900/10 bg-sand-50 px-3 py-1 text-xs uppercase tracking-[0.18em] text-ink-700">
                  {client.active ? "Active" : "Inactive"}
                </span>
              </div>
              <h3 className="font-display text-2xl text-ink-950">{client.name}</h3>
              <p className="text-sm leading-7 text-ink-700">Updated {dateFormatter.format(client.updatedAt)}</p>
            </Panel>
          ))}
        </div>
      )}
    </AppShell>
  );
}
