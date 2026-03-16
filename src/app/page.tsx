import Link from "next/link";
import { ArrowRight, BarChart3, Building2, ShieldCheck, TimerReset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SectionHeading } from "@/components/ui/section-heading";

const valueProps = [
  {
    title: "Operational visibility",
    description: "Track productive and idle events with governance, clean ownership, and a reporting model built for industrial teams.",
    icon: BarChart3
  },
  {
    title: "Customer-ready controls",
    description: "Organizations, memberships, governed roles, and auditability are designed into the platform from day one.",
    icon: ShieldCheck
  },
  {
    title: "Faster shift decisions",
    description: "From event capture to reporting, the product is structured around live operational rhythm rather than generic SaaS workflows.",
    icon: TimerReset
  }
];

export default function HomePage() {
  return (
    <main className="pb-20">
      <section className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-panel backdrop-blur-xl sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink-500">Transbordo Cloud</p>
              <p className="mt-2 text-sm text-ink-700">Industrial premium SaaS foundation. Landing page final design will follow the Figma handoff.</p>
            </div>
            <div className="hidden rounded-full border border-ink-900/10 bg-sand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-ink-700 sm:block">
              Greenfield rebuild
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-8 pt-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="space-y-8">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-ink-900/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ink-700">
              Operations SaaS for industrial teams
            </p>
            <div className="space-y-5">
              <h1 className="max-w-5xl font-display text-5xl leading-[0.92] text-ink-950 sm:text-6xl lg:text-7xl">
                The governed operating system for transbordo performance.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-ink-700">
                We are rebuilding the product from first principles to serve multiple industrial organizations with stronger governance,
                reporting, and operator workflows.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  View workspace preview
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {valueProps.map((item) => {
              const Icon = item.icon;

              return (
                <Panel className="space-y-4" key={item.title}>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-950 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-display text-2xl text-ink-950">{item.title}</h2>
                    <p className="text-sm leading-7 text-ink-700">{item.description}</p>
                  </div>
                </Panel>
              );
            })}
          </div>
        </div>

        <Panel className="relative overflow-hidden border-ink-900/10 bg-ink-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(214,105,45,0.38),_transparent_32%)]" />
          <div className="relative space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">Product shape</p>
              <h2 className="mt-4 font-display text-4xl leading-none">Vertical SaaS, not a reskin.</h2>
            </div>
            <div className="space-y-4 text-sm leading-7 text-white/72">
              <p>The current app is now reference material. The new platform is being structured around organizations, team governance, and a cleaner operational surface.</p>
              <p>Landing visuals are intentionally temporary until the final Figma is provided. The product shell, data model, and internal UX direction are already SaaS-oriented.</p>
            </div>
            <div className="grid gap-3">
              {[
                "Organization-scoped data model",
                "Sales-led onboarding",
                "Single-site orgs in v1",
                "Operations + reports launch scope"
              ].map((line) => (
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3" key={line}>
                  <Building2 className="h-4 w-4 text-sand-200" />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </section>

      <section className="mx-auto max-w-[1440px] space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Foundation"
          title="The rebuild starts with a product system, not a landing page."
          description="This baseline already separates marketing, application shell, tenancy model, and operational domain logic so the rest of the SaaS can grow without dragging legacy assumptions forward."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "Marketing surface",
              body: "Public positioning, future Figma-based landing page, and a credible first impression for industrial buyers."
            },
            {
              title: "Workspace shell",
              body: "A desktop-first application structure for operations managers, with responsive accommodations for operator workflows."
            },
            {
              title: "SaaS data model",
              body: "Organizations, memberships, invitations, settings, clients, events, and event revisions are treated as first-class concerns."
            }
          ].map((item) => (
            <Panel className="space-y-3" key={item.title}>
              <h3 className="font-display text-2xl text-ink-950">{item.title}</h3>
              <p className="text-sm leading-7 text-ink-700">{item.body}</p>
            </Panel>
          ))}
        </div>
      </section>
    </main>
  );
}
