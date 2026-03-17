import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";
import { requireWorkspaceViewer } from "@/lib/auth/session";
import { getWorkspaceDashboardSnapshot } from "@/lib/app/workspace";

const numberFormatter = new Intl.NumberFormat("pt-BR");

export default async function DashboardPage() {
  const viewer = await requireWorkspaceViewer();
  const snapshot = await getWorkspaceDashboardSnapshot(viewer.activeMembership.organization.id);
  const cards = [
    {
      label: "Usuarios ativos",
      value: numberFormatter.format(snapshot.activeMembers),
      note: "Assentos operacionais ativos nesta organizacao."
    },
    {
      label: "Convites pendentes",
      value: numberFormatter.format(snapshot.pendingInvites),
      note: "Convites aguardando aceite ou ativacao manual."
    },
    {
      label: "Clientes ativos",
      value: numberFormatter.format(snapshot.activeClients),
      note: "Cadastro disponivel para eventos produtivos governados."
    },
    {
      label: "Eventos em 30 dias",
      value: numberFormatter.format(snapshot.eventsLast30Days),
      note: `${numberFormatter.format(snapshot.productiveEventsLast30Days)} classificados como produtivos.`
    }
  ];

  return (
    <AppShell
      viewer={viewer}
      currentPath="/dashboard"
      title="Painel operacional"
      description="Visao executiva da organizacao ativa, com contadores, guardrails de implantacao e o primeiro recorte de governanca do produto SaaS."
    >
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card, index) => (
            <Panel className="space-y-3" key={card.label}>
              <div
                className="h-px w-12"
                style={{
                  backgroundColor: ["#e87b35", "#5b9a6f", "#d4a843", "#6b8fb5"][index]
                }}
              />
              <p className="text-sm uppercase tracking-[0.18em] text-ink-500">{card.label}</p>
              <p className="font-display text-5xl leading-none text-ink-950">{card.value}</p>
              <p className="text-sm leading-6 text-ink-700">{card.note}</p>
            </Panel>
          ))}
        </div>

        <Panel className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-ember-500" />
            <p className="text-xs uppercase tracking-[0.28em] text-ember-500">Organizacao atual</p>
          </div>
          <h3 className="font-display text-3xl leading-none text-ink-950">{viewer.activeMembership.organization.name}</h3>
          <div className="space-y-4 text-sm leading-7 text-ink-700">
            <p>
              O workspace ativo esta ancorado em <strong>{viewer.activeMembership.organization.slug}</strong> e opera em{" "}
              <strong>{viewer.activeMembership.settings?.timezone ?? "America/Sao_Paulo"}</strong>.
            </p>
            <p>
              O MVP continua intencionalmente enxuto: membros, clientes, lancamentos, historico de revisoes e relatorios. Billing e multi-site ficam fora do primeiro corte.
            </p>
          </div>
          <div className="grid gap-3">
            {[
              "Convide os primeiros gestores e operadores.",
              "Configure o contato de aprovacao em configuracoes.",
              "Cadastre clientes antes de abrir eventos produtivos."
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
