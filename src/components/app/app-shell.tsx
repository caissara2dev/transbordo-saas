import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  ChartNoAxesCombined,
  ClipboardList,
  Cog,
  LogOut,
  ShieldCheck,
  Users
} from "lucide-react";
import { signOutAction } from "@/lib/auth/actions";
import {
  canConfigureWorkspace,
  canManageWorkspace,
  organizationRoleLabels,
  platformRoleLabels
} from "@/lib/auth/permissions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { WorkspaceViewer } from "@/types/app";

const navItems = [
  {
    href: "/dashboard",
    label: "Painel",
    icon: ChartNoAxesCombined,
    visible: () => true
  },
  {
    href: "/lancamentos",
    label: "Lancamentos",
    icon: ClipboardList,
    visible: () => true
  },
  {
    href: "/clients",
    label: "Clientes",
    icon: Building2,
    visible: canManageWorkspace
  },
  {
    href: "/team",
    label: "Equipe",
    icon: Users,
    visible: canManageWorkspace
  },
  {
    href: "/governance",
    label: "Governanca",
    icon: ShieldCheck,
    visible: canManageWorkspace
  },
  {
    href: "/settings",
    label: "Configuracoes",
    icon: Cog,
    visible: canConfigureWorkspace
  }
] as const;

export function AppShell({
  viewer,
  currentPath,
  title,
  description,
  children
}: {
  viewer: WorkspaceViewer;
  currentPath: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const role = viewer.activeMembership.role;
  const visibleItems = navItems.filter((item) => item.visible(role));
  const operationsLabel = viewer.activeMembership.settings?.operationsLabel ?? "Transbordo";
  const timezone = viewer.activeMembership.settings?.timezone ?? "America/Sao_Paulo";
  const approvalContact = viewer.activeMembership.settings?.approvalContactPhone ?? "Nao configurado";
  const displayName = viewer.profile.fullName || viewer.profile.email;
  const signOutLabel = viewer.isDemo ? "Sair do demo" : "Sair";

  return (
    <div className="relative min-h-screen overflow-hidden bg-sand-50 text-ink-950">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />
      <div className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-ember-500/5 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen max-w-[1560px] gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <aside className="hidden w-80 shrink-0 rounded-[30px] border border-black/10 bg-white px-6 py-6 shadow-panel lg:flex lg:flex-col">
          <Link className="space-y-3" href="/">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-ember-500">
                <span className="font-display text-sm font-bold text-white">TC</span>
              </div>
              <div>
                <p className="font-body text-[11px] uppercase tracking-[0.32em] text-ink-500">Transbordo Cloud</p>
                <h1 className="font-display text-[28px] leading-none text-ink-950">{operationsLabel} control</h1>
              </div>
            </div>
          </Link>

          <div className="mt-8 rounded-[22px] border border-black/10 bg-sand-50/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.3em] text-ink-500">Organizacao ativa</p>
                <h2 className="mt-2 font-display text-[28px] leading-none text-ink-950">
                  {viewer.activeMembership.organization.name}
                </h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded bg-sage-500/10">
                <Building2 className="h-5 w-5 text-sage-500" />
              </div>
            </div>
            <p className="text-sm text-ink-600">{viewer.activeMembership.organization.slug}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em]">
              <span className="rounded-full border border-black/10 bg-white px-3 py-2 text-ink-800">
                {organizationRoleLabels[role]}
              </span>
              <span className="rounded-full border border-black/10 bg-white px-3 py-2 text-ink-500">
                {platformRoleLabels[viewer.profile.platformRole]}
              </span>
              {viewer.isDemo ? (
                <span className="rounded-full border border-gold-500/20 bg-gold-500/10 px-3 py-2 text-gold-700">
                  Demo mode
                </span>
              ) : null}
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-8 bg-ember-500" />
              <span className="font-body text-[10px] uppercase tracking-[0.32em] text-ember-500">Workspace</span>
            </div>
            <nav className="space-y-2">
            {visibleItems.map((item) => {
              const Icon = item.icon;
              const active = currentPath === item.href;

              return (
                <Link
                  className={cn(
                    "group flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition",
                    active
                      ? "border-black/12 bg-white text-ink-950 shadow-sm"
                      : "border-transparent text-ink-600 hover:border-black/10 hover:bg-sand-50 hover:text-ink-950"
                  )}
                  href={item.href}
                  key={item.href}
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded transition",
                      active ? "bg-ember-500/10 text-ember-500" : "bg-black/[0.03] text-ink-500 group-hover:bg-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-inherit">{item.label}</div>
                  </div>
                  {active ? <ArrowUpRight className="h-4 w-4 text-ember-500" /> : null}
                </Link>
              );
            })}
            </nav>
          </div>

          <div className="mt-auto rounded-[22px] border border-black/10 bg-white p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-ink-500">Guardrails ativos</p>
            <dl className="mt-4 space-y-3 text-sm leading-6 text-ink-700">
              <div>
                <dt className="text-ink-500">Timezone</dt>
                <dd>{timezone}</dd>
              </div>
              <div>
                <dt className="text-ink-500">Contato de aprovacao</dt>
                <dd>{approvalContact}</dd>
              </div>
              <div>
                <dt className="text-ink-500">Status da organizacao</dt>
                <dd className="capitalize">{viewer.activeMembership.organization.status}</dd>
              </div>
            </dl>
          </div>
        </aside>

        <main className="flex-1 rounded-[30px] border border-black/10 bg-white p-4 shadow-panel sm:p-6">
          <div className="mb-5 flex flex-wrap gap-2 lg:hidden">
            {visibleItems.map((item) => {
              const Icon = item.icon;
              const active = currentPath === item.href;

              return (
                <Link
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition",
                    active
                      ? "border-ember-500 bg-ember-500 text-white shadow-sm"
                      : "border-black/10 bg-white text-ink-800 hover:bg-sand-50"
                  )}
                  href={item.href}
                  key={item.href}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          <header className="flex flex-col gap-4 border-b border-black/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-ember-500" />
                <p className="text-[10px] uppercase tracking-[0.32em] text-ember-500">Workspace ativo</p>
              </div>
              <h2 className="font-display text-4xl leading-none text-ink-950 sm:text-5xl">{title}</h2>
              <p className="max-w-3xl text-sm leading-6 text-ink-700 sm:text-base">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <div className="rounded-[18px] border border-black/10 bg-sand-50/80 px-4 py-3 text-sm text-ink-800 shadow-sm">
                <p className="font-semibold text-ink-950">{displayName}</p>
                <p className="text-ink-600">
                  {organizationRoleLabels[role]} em {viewer.activeMembership.organization.name}
                </p>
                {viewer.isDemo ? <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold-700">Workspace demo local</p> : null}
              </div>
              <form action={signOutAction}>
                <Button size="sm" type="submit" variant="ghost">
                  <LogOut className="h-4 w-4" />
                  {signOutLabel}
                </Button>
              </form>
            </div>
          </header>
          <div className="pt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
