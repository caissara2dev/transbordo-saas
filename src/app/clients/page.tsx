import { redirect } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";
import { canConfigureWorkspace } from "@/lib/auth/permissions";
import { requireWorkspaceViewer } from "@/lib/auth/session";
import { getOrganizationClients } from "@/lib/app/workspace";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "medium"
});

export default async function ClientsPage() {
  const viewer = await requireWorkspaceViewer();
  if (!canConfigureWorkspace(viewer.activeMembership.role)) {
    redirect("/dashboard");
  }

  const records = await getOrganizationClients(viewer.activeMembership.organization.id);

  return (
    <AppShell
      viewer={viewer}
      currentPath="/clients"
      title="Clientes"
      description="Cadastro operacional da organizacao, com status ativo/inativo e base pronta para uso em lancamentos produtivos e relatorios."
    >
      {records.length === 0 ? (
        <Panel className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-ink-500">Base vazia</p>
          <h3 className="font-display text-3xl text-ink-950">Nenhum cliente cadastrado ainda.</h3>
          <p className="max-w-2xl text-sm leading-7 text-ink-700">
            Os lancamentos produtivos dependem de uma base de clientes por organizacao. Este estado vazio e esperado em workspaces novos.
          </p>
        </Panel>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {records.map((client) => (
            <Panel className="space-y-3" key={client.id}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.28em] text-ink-500">Cliente</p>
                <span className="rounded-full border border-ink-900/10 bg-sand-50 px-3 py-1 text-xs uppercase tracking-[0.18em] text-ink-700">
                  {client.active ? "Ativo" : "Inativo"}
                </span>
              </div>
              <h3 className="font-display text-2xl text-ink-950">{client.name}</h3>
              <p className="text-sm leading-7 text-ink-700">Atualizado em {dateFormatter.format(client.updatedAt)}</p>
            </Panel>
          ))}
        </div>
      )}
    </AppShell>
  );
}
