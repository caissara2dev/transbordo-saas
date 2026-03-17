import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import {
  BarChart3,
  Building2,
  ChevronDown,
  ClipboardList,
  Cog,
  LayoutGrid,
  LogOut,
  Menu,
  ShieldCheck,
  Users
} from "lucide-react";
import { signOutAction } from "@/lib/auth/actions";
import {
  canConfigureWorkspace,
  canManageWorkspace,
  canViewReports,
  organizationRoleLabels,
  platformRoleLabels
} from "@/lib/auth/permissions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { WorkspaceViewer } from "@/types/app";

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  visible: (role: WorkspaceViewer["activeMembership"]["role"]) => boolean;
};

const primaryNavItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
    visible: () => true
  },
  {
    href: "/lancamentos",
    label: "Lancamentos",
    icon: ClipboardList,
    visible: () => true
  },
  {
    href: "/relatorios",
    label: "Relatorios",
    icon: BarChart3,
    visible: canViewReports
  },
  {
    href: "/clients",
    label: "Clientes",
    icon: Building2,
    visible: canConfigureWorkspace
  },
  {
    href: "/team",
    label: "Usuarios",
    icon: Users,
    visible: canConfigureWorkspace
  }
] as const;

const utilityNavItems: NavItem[] = [
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

function isActivePath(currentPath: string, href: string) {
  return currentPath === href;
}

export function AppShell({
  viewer,
  currentPath,
  title,
  description,
  showPageHeader = true,
  children
}: {
  viewer: WorkspaceViewer;
  currentPath: string;
  title: string;
  description: string;
  showPageHeader?: boolean;
  children: ReactNode;
}) {
  const role = viewer.activeMembership.role;
  const primaryItems = primaryNavItems.filter((item) => item.visible(role));
  const utilityItems = utilityNavItems.filter((item) => item.visible(role));
  const displayName = viewer.profile.fullName || viewer.profile.email;
  const signOutLabel = viewer.isDemo ? "Sair do demo" : "Sair";
  const activeUtilityItem = utilityItems.find((item) => isActivePath(currentPath, item.href));

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

      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link className="flex items-center gap-3" href="/">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-ember-500">
                  <span className="font-display text-sm font-bold text-white">TC</span>
                </div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.32em] text-ink-500">Transbordo Cloud</p>
                  <p className="font-display text-lg leading-none text-ink-950">Workspace operacional</p>
                </div>
              </Link>

              <nav className="hidden items-center gap-2 xl:flex">
                {primaryItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActivePath(currentPath, item.href);

                  return (
                    <Link
                      className={cn(
                        "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition",
                        active
                          ? "border-ember-500 bg-ember-500 text-white shadow-sm"
                          : "border-transparent text-ink-600 hover:border-black/10 hover:bg-sand-50 hover:text-ink-950"
                      )}
                      href={item.href as never}
                      key={item.href}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <div className="rounded-lg border border-black/10 bg-white px-4 py-2 text-right shadow-sm">
                <p className="text-sm font-semibold text-ink-950">{displayName}</p>
                <p className="text-xs text-ink-500">
                  {organizationRoleLabels[role]} · {platformRoleLabels[viewer.profile.platformRole]}
                </p>
              </div>

              {utilityItems.length > 0 ? (
                <details className="group relative">
                  <summary className="flex list-none cursor-pointer items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm text-ink-700 shadow-sm transition hover:bg-sand-50">
                    {activeUtilityItem ? activeUtilityItem.label : "Menu"}
                    <ChevronDown className="h-4 w-4 text-ink-500 transition group-open:rotate-180" />
                  </summary>
                  <div className="absolute right-0 top-[calc(100%+12px)] hidden w-64 rounded-[22px] border border-black/10 bg-white p-3 shadow-panel group-open:block">
                    <div className="mb-2 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-ink-500">Secundario</div>
                    <div className="space-y-1">
                      {utilityItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActivePath(currentPath, item.href);

                        return (
                          <Link
                            className={cn(
                              "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition",
                              active ? "bg-sand-50 text-ink-950" : "text-ink-600 hover:bg-sand-50 hover:text-ink-950"
                            )}
                            href={item.href as never}
                            key={item.href}
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded bg-black/[0.03]">
                              <Icon className={cn("h-4 w-4", active ? "text-ember-500" : "text-ink-500")} />
                            </div>
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </details>
              ) : null}

              <form action={signOutAction}>
                <Button size="sm" type="submit" variant="ghost">
                  <LogOut className="h-4 w-4" />
                  {signOutLabel}
                </Button>
              </form>
            </div>

            <details className="group relative md:hidden">
              <summary className="flex list-none cursor-pointer items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm text-ink-700 shadow-sm">
                <Menu className="h-4 w-4" />
                Menu
              </summary>
              <div className="fixed inset-0 hidden bg-ink-950/20 group-open:block" />
              <div className="absolute right-0 top-[calc(100%+12px)] z-50 hidden w-[calc(100vw-2rem)] max-w-sm rounded-[24px] border border-black/10 bg-white p-4 shadow-panel group-open:block">
                <div className="rounded-[18px] border border-black/10 bg-sand-50/70 px-4 py-3">
                  <p className="font-semibold text-ink-950">{displayName}</p>
                  <p className="mt-1 text-sm text-ink-600">{organizationRoleLabels[role]}</p>
                </div>

                <div className="mt-4">
                  <p className="mb-2 px-1 text-[10px] uppercase tracking-[0.3em] text-ink-500">Principal</p>
                  <div className="space-y-1">
                    {primaryItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActivePath(currentPath, item.href);

                      return (
                        <Link
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition",
                            active ? "bg-ember-500 text-white" : "text-ink-700 hover:bg-sand-50"
                          )}
                          href={item.href as never}
                          key={item.href}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {utilityItems.length > 0 ? (
                  <div className="mt-4">
                    <p className="mb-2 px-1 text-[10px] uppercase tracking-[0.3em] text-ink-500">Secundario</p>
                    <div className="space-y-1">
                      {utilityItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActivePath(currentPath, item.href);

                        return (
                          <Link
                            className={cn(
                              "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition",
                              active ? "bg-sand-50 text-ink-950" : "text-ink-700 hover:bg-sand-50"
                            )}
                            href={item.href as never}
                            key={item.href}
                          >
                            <Icon className="h-4 w-4" />
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                <form action={signOutAction} className="mt-4">
                  <Button className="w-full" size="lg" type="submit" variant="secondary">
                    <LogOut className="h-4 w-4" />
                    {signOutLabel}
                  </Button>
                </form>
              </div>
            </details>
          </div>

          <div className="hidden overflow-x-auto pb-4 md:flex xl:hidden">
            <nav className="flex items-center gap-2">
              {primaryItems.map((item) => {
                const Icon = item.icon;
                const active = isActivePath(currentPath, item.href);

                return (
                  <Link
                    className={cn(
                      "inline-flex whitespace-nowrap items-center gap-2 rounded-lg border px-4 py-2 text-sm transition",
                      active
                        ? "border-ember-500 bg-ember-500 text-white shadow-sm"
                        : "border-transparent text-ink-600 hover:border-black/10 hover:bg-sand-50 hover:text-ink-950"
                    )}
                    href={item.href as never}
                    key={item.href}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {showPageHeader ? (
          <header className="mb-6 rounded-[28px] border border-black/10 bg-white p-6 shadow-panel">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-8 bg-ember-500" />
              <p className="text-[10px] uppercase tracking-[0.32em] text-ember-500">Workspace ativo</p>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <h2 className="font-display text-4xl leading-none text-ink-950 sm:text-5xl">{title}</h2>
                <p className="max-w-3xl text-sm leading-6 text-ink-700 sm:text-base">{description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-black/10 bg-sand-50 px-3 py-2 text-xs uppercase tracking-[0.18em] text-ink-700">
                  {organizationRoleLabels[role]}
                </span>
                {viewer.isDemo ? (
                  <span className="rounded-full border border-gold-500/20 bg-gold-500/10 px-3 py-2 text-xs uppercase tracking-[0.18em] text-gold-700">
                    Demo mode
                  </span>
                ) : null}
              </div>
            </div>
          </header>
        ) : null}

        <div>{children}</div>
      </main>
    </div>
  );
}
