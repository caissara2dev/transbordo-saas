import Link from "next/link";
import {
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
    label: "Overview",
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
    label: "Clients",
    icon: Building2,
    visible: canManageWorkspace
  },
  {
    href: "/team",
    label: "Team",
    icon: Users,
    visible: canManageWorkspace
  },
  {
    href: "/governance",
    label: "Governance",
    icon: ShieldCheck,
    visible: canManageWorkspace
  },
  {
    href: "/settings",
    label: "Settings",
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
  const approvalContact = viewer.activeMembership.settings?.approvalContactPhone ?? "Not configured yet";
  const displayName = viewer.profile.fullName || viewer.profile.email;
  const signOutLabel = viewer.isDemo ? "Exit demo" : "Sign out";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(214,105,45,0.12),_transparent_26%),linear-gradient(180deg,_#f7f4ef_0%,_#eef3f4_100%)]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <aside className="hidden w-80 shrink-0 rounded-[2rem] border border-ink-900/10 bg-ink-950 px-6 py-8 text-white shadow-float lg:flex lg:flex-col">
          <Link className="space-y-2" href="/">
            <p className="text-xs uppercase tracking-[0.36em] text-white/50">Transbordo Cloud</p>
            <h1 className="font-display text-3xl leading-none">{operationsLabel} control, redesigned.</h1>
          </Link>
          <div className="mt-8 space-y-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.28em] text-white/40">Active organization</p>
              <h2 className="font-display text-3xl leading-none">{viewer.activeMembership.organization.name}</h2>
              <p className="text-sm text-white/55">{viewer.activeMembership.organization.slug}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em]">
              <span className="rounded-full border border-white/12 bg-white/8 px-3 py-2 text-white/80">
                {organizationRoleLabels[role]}
              </span>
              <span className="rounded-full border border-white/12 bg-white/8 px-3 py-2 text-white/60">
                {platformRoleLabels[viewer.profile.platformRole]}
              </span>
              {viewer.isDemo ? (
                <span className="rounded-full border border-amber-200/25 bg-amber-300/15 px-3 py-2 text-amber-100">
                  Demo mode
                </span>
              ) : null}
            </div>
          </div>
          <nav className="mt-8 space-y-2">
            {visibleItems.map((item) => {
              const Icon = item.icon;
              const active = currentPath === item.href;

              return (
                <Link
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                    active ? "bg-white text-ink-950" : "text-white/72 hover:bg-white/8 hover:text-white"
                  )}
                  href={item.href}
                  key={item.href}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">Workspace guardrails</p>
            <dl className="mt-3 space-y-3 text-sm leading-6 text-white/70">
              <div>
                <dt className="text-white/40">Timezone</dt>
                <dd>{timezone}</dd>
              </div>
              <div>
                <dt className="text-white/40">Approval contact</dt>
                <dd>{approvalContact}</dd>
              </div>
              <div>
                <dt className="text-white/40">Org status</dt>
                <dd className="capitalize">{viewer.activeMembership.organization.status}</dd>
              </div>
            </dl>
          </div>
        </aside>

        <main className="flex-1 rounded-[2rem] border border-white/70 bg-white/65 p-4 shadow-panel backdrop-blur-xl sm:p-6">
          <div className="mb-5 flex flex-wrap gap-2 lg:hidden">
            {visibleItems.map((item) => {
              const Icon = item.icon;
              const active = currentPath === item.href;

              return (
                <Link
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                    active
                      ? "bg-ink-950 text-white shadow-float"
                      : "bg-white/80 text-ink-800 ring-1 ring-ink-900/10 hover:bg-white"
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
          <header className="flex flex-col gap-4 border-b border-ink-900/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.32em] text-ink-500">Live workspace</p>
              <h2 className="font-display text-4xl leading-none text-ink-950">{title}</h2>
              <p className="max-w-3xl text-sm leading-6 text-ink-700 sm:text-base">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <div className="rounded-[1.4rem] border border-ink-900/10 bg-sand-50/80 px-4 py-3 text-sm text-ink-800 shadow-sm">
                <p className="font-semibold text-ink-950">{displayName}</p>
                <p className="text-ink-600">
                  {organizationRoleLabels[role]} at {viewer.activeMembership.organization.name}
                </p>
                {viewer.isDemo ? <p className="mt-1 text-xs uppercase tracking-[0.18em] text-amber-700">Local demo workspace</p> : null}
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
