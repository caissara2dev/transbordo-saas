import Link from "next/link";
import { Building2, ChartNoAxesCombined, ClipboardList, Cog, ShieldCheck, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: ChartNoAxesCombined },
  { href: "/operations", label: "Operations", icon: ClipboardList },
  { href: "/clients", label: "Clients", icon: Building2 },
  { href: "/team", label: "Team", icon: Users },
  { href: "/governance", label: "Governance", icon: ShieldCheck },
  { href: "/settings", label: "Settings", icon: Cog }
] as const;

export function AppShell({
  currentPath,
  title,
  description,
  children
}: {
  currentPath: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(214,105,45,0.12),_transparent_26%),linear-gradient(180deg,_#f7f4ef_0%,_#eef3f4_100%)]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <aside className="hidden w-80 shrink-0 rounded-[2rem] border border-ink-900/10 bg-ink-950 px-6 py-8 text-white shadow-float lg:flex lg:flex-col">
          <Link className="space-y-2" href="/">
            <p className="text-xs uppercase tracking-[0.36em] text-white/50">Transbordo Cloud</p>
            <h1 className="font-display text-3xl leading-none">Operations control, redesigned.</h1>
          </Link>
          <nav className="mt-10 space-y-2">
            {navItems.map((item) => {
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
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">Current model</p>
            <p className="mt-3 text-lg font-semibold">Single-site org SaaS MVP</p>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Sales-led onboarding, governed teams, operational events, and reporting in one controlled workspace.
            </p>
          </div>
        </aside>

        <main className="flex-1 rounded-[2rem] border border-white/70 bg-white/65 p-4 shadow-panel backdrop-blur-xl sm:p-6">
          <header className="flex flex-col gap-4 border-b border-ink-900/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.32em] text-ink-500">Workspace preview</p>
              <h2 className="font-display text-4xl leading-none text-ink-950">{title}</h2>
              <p className="max-w-3xl text-sm leading-6 text-ink-700 sm:text-base">{description}</p>
            </div>
            <div className="flex gap-3">
              <div className="rounded-full border border-ink-900/10 bg-sand-50 px-4 py-2 text-sm text-ink-800">
                Caissara Demo Org
              </div>
            </div>
          </header>
          <div className="pt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
