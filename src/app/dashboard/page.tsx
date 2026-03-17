import Link from "next/link";
import { BarChart3, Building2, ClipboardList, Users } from "lucide-react";
import type { ComponentType } from "react";
import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";
import { requireWorkspaceViewer } from "@/lib/auth/session";
import { getWorkspaceDashboardSnapshot } from "@/lib/app/workspace";
import { canConfigureWorkspace, canViewReports } from "@/lib/auth/permissions";
import { cn } from "@/lib/utils";
import type { WorkspaceViewer } from "@/types/app";

const numberFormatter = new Intl.NumberFormat("pt-BR");

const snapshotColors = ["#e87b35", "#5b9a6f", "#d4a843", "#6b8fb5"];

type ShortcutItem = {
  href: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  surface: string;
  visible: (role: WorkspaceViewer["activeMembership"]["role"]) => boolean;
};

const shortcutItems: ShortcutItem[] = [
  {
    href: "/lancamentos",
    title: "Lancamentos",
    description: "Registrar, editar e consultar historico operacional.",
    icon: ClipboardList,
    color: "text-ember-500",
    surface: "bg-ember-500/10",
    visible: () => true
  },
  {
    href: "/relatorios",
    title: "Relatorios",
    description: "Indicadores, graficos e exportacoes operacionais.",
    icon: BarChart3,
    color: "text-gold-500",
    surface: "bg-gold-500/10",
    visible: canViewReports
  },
  {
    href: "/clients",
    title: "Clientes",
    description: "Cadastro, ativacao e governanca da base de clientes.",
    icon: Building2,
    color: "text-sage-500",
    surface: "bg-sage-500/10",
    visible: canConfigureWorkspace
  },
  {
    href: "/team",
    title: "Usuarios",
    description: "Aprovacoes manuais e ajuste de papeis de acesso.",
    icon: Users,
    color: "text-steel-500",
    surface: "bg-steel-500/10",
    visible: canConfigureWorkspace
  }
] as const;

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
      note: "Base disponivel para eventos produtivos."
    },
    {
      label: "Eventos em 30 dias",
      value: numberFormatter.format(snapshot.eventsLast30Days),
      note: `${numberFormatter.format(snapshot.productiveEventsLast30Days)} classificados como produtivos.`
    }
  ];
  const visibleShortcuts = shortcutItems.filter((item) => item.visible(viewer.activeMembership.role));

  return (
    <AppShell
      viewer={viewer}
      currentPath="/dashboard"
      title="Visao geral do turno"
      description="Use os atalhos abaixo para operar o workspace, acompanhar os indicadores rapidos e navegar pelas areas centrais do produto."
    >
      <section className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => (
            <Panel className="space-y-3" key={card.label}>
              <div className="h-px w-12" style={{ backgroundColor: snapshotColors[index] }} />
              <p className="text-sm uppercase tracking-[0.18em] text-ink-500">{card.label}</p>
              <p className="font-display text-5xl leading-none text-ink-950">{card.value}</p>
              <p className="text-sm leading-6 text-ink-700">{card.note}</p>
            </Panel>
          ))}
        </div>

        <section className="space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-ember-500" />
              <p className="text-[10px] uppercase tracking-[0.32em] text-ember-500">Painel de controle</p>
            </div>
            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h3 className="font-display text-3xl text-ink-950 sm:text-4xl">Acessos rapidos do workspace</h3>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-700">
                  A dashboard volta a funcionar como o centro operacional do app, com os atalhos principais do turno na frente e sem depender de sidebar fixa.
                </p>
              </div>
              <div className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs uppercase tracking-[0.18em] text-ink-600">
                {viewer.profile.fullName || viewer.profile.email}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {visibleShortcuts.map((item) => {
              const Icon = item.icon;

              return (
                <Link className="group block" href={item.href as never} key={item.href}>
                  <Panel className="h-full space-y-5 transition duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
                    <div className="flex items-center justify-between gap-3">
                      <div className={cn("flex h-11 w-11 items-center justify-center rounded-lg", item.surface)}>
                        <Icon className={cn("h-5 w-5", item.color)} />
                      </div>
                      <div className="rounded-full border border-black/10 bg-sand-50 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-ink-500">
                        Area
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display text-2xl text-ink-950">{item.title}</h4>
                      <p className="mt-2 text-sm leading-7 text-ink-700">{item.description}</p>
                    </div>
                    <div className="pt-2 text-sm font-medium text-ink-600 transition group-hover:text-ink-950">Abrir area</div>
                  </Panel>
                </Link>
              );
            })}
          </div>
        </section>
      </section>
    </AppShell>
  );
}
