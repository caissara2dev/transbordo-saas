import Link from "next/link";
import {
  BarChart3,
  Building2,
  ChevronRight,
  ClipboardList,
  ShieldCheck,
  UserCog
} from "lucide-react";
import type { ComponentType } from "react";
import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";
import { requireWorkspaceViewer } from "@/lib/auth/session";
import { getWorkspaceDashboardSnapshot } from "@/lib/app/workspace";
import { canConfigureWorkspace, canViewReports } from "@/lib/auth/permissions";
import { cn } from "@/lib/utils";
import type { WorkspaceViewer } from "@/types/app";

const numberFormatter = new Intl.NumberFormat("pt-BR");

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
    color: "text-steel-500",
    surface: "bg-steel-500/10",
    visible: canConfigureWorkspace
  },
  {
    href: "/team",
    title: "Usuarios",
    description: "Aprovacoes manuais e ajuste de papeis de acesso.",
    icon: UserCog,
    color: "text-sage-500",
    surface: "bg-sage-500/10",
    visible: canConfigureWorkspace
  }
];

export default async function DashboardPage() {
  const viewer = await requireWorkspaceViewer();
  const snapshot = await getWorkspaceDashboardSnapshot(viewer.activeMembership.organization.id);
  const visibleShortcuts = shortcutItems.filter((item) => item.visible(viewer.activeMembership.role));
  const displayName = viewer.profile.fullName || viewer.profile.email;
  const snapshotCards = [
    {
      label: "Usuarios ativos",
      value: numberFormatter.format(snapshot.activeMembers),
      tone: "text-[#1a1a1f]"
    },
    {
      label: "Convites pendentes",
      value: numberFormatter.format(snapshot.pendingInvites),
      tone: "text-[#d4a843]"
    },
    {
      label: "Clientes ativos",
      value: numberFormatter.format(snapshot.activeClients),
      tone: "text-[#6b8fb5]"
    },
    {
      label: "Eventos em 30 dias",
      value: numberFormatter.format(snapshot.eventsLast30Days),
      tone: "text-[#5b9a6f]"
    }
  ];

  return (
    <AppShell
      viewer={viewer}
      currentPath="/dashboard"
      title="Visao geral do turno"
      description="Use os atalhos abaixo para operar o workspace, acompanhar os indicadores rapidos e navegar pelas areas centrais do produto."
      showPageHeader={false}
    >
      <section className="space-y-8">
        <div>
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded border border-black/[0.08] bg-white px-3 py-1.5 shadow-sm">
              <span className="font-body text-[12px] uppercase tracking-wider text-ink-500">Painel de controle</span>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="font-display text-[32px] leading-tight tracking-tight text-[#1a1a1f] lg:text-[40px]">Visao geral do turno</h1>
            <p className="mt-3 font-body text-[15px] text-[#606060]">
              Bem-vindo(a), {displayName}. Use os atalhos para operar o turno.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {snapshotCards.map((card) => (
            <Panel className="space-y-2" key={card.label}>
              <div className="font-body text-[11px] uppercase tracking-wider text-[#606060]">{card.label}</div>
              <div className={cn("font-display text-[28px] tracking-tight", card.tone)}>{card.value}</div>
            </Panel>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {visibleShortcuts.map((item) => {
            const Icon = item.icon;

            return (
              <Link className="group block" href={item.href as never} key={item.href}>
                <Panel className="h-full p-6 text-left transition-all duration-300 group-hover:border-black/[0.18] group-hover:shadow-md">
                  <div className="mb-4 flex items-start justify-between">
                    <div className={cn("flex h-11 w-11 items-center justify-center rounded", item.surface)}>
                      <Icon className={cn("h-5 w-5", item.color)} />
                    </div>
                    <ChevronRight className="h-5 w-5 text-[#606060] opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="font-display text-[18px] text-[#1a1a1f]">{item.title}</h3>
                  <p className="mt-2 font-body text-[14px] leading-relaxed text-[#606060]">{item.description}</p>
                </Panel>
              </Link>
            );
          })}
        </div>

        <div className="rounded-lg border border-black/[0.08] bg-white p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#5b9a6f]/10">
              <ShieldCheck className="h-5 w-5 text-[#5b9a6f]" />
            </div>
            <div>
              <p className="font-display text-[17px] text-[#1a1a1f]">Workspace governado por organizacao</p>
              <p className="mt-1 font-body text-[14px] leading-relaxed text-[#606060]">
                Permissoes, acessos e atalhos desta dashboard respeitam o papel do usuario dentro da organizacao ativa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
