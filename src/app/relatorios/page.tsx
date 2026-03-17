import { redirect } from "next/navigation";
import { BarChart3, Download, FileSpreadsheet, LineChart } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { Panel } from "@/components/ui/panel";
import { canViewReports } from "@/lib/auth/permissions";
import { requireWorkspaceViewer } from "@/lib/auth/session";
import { cn } from "@/lib/utils";

export default async function RelatoriosPage() {
  const viewer = await requireWorkspaceViewer();
  if (!canViewReports(viewer.activeMembership.role)) {
    redirect("/dashboard");
  }

  const roadmapCards = [
    {
      label: "Overview",
      note: "KPIs consolidados",
      icon: BarChart3,
      tone: "text-ember-500",
      surface: "bg-ember-500/10"
    },
    {
      label: "Drilldown",
      note: "Filtros e recortes",
      icon: LineChart,
      tone: "text-sage-500",
      surface: "bg-sage-500/10"
    },
    {
      label: "Exportacao",
      note: "CSV e planilhas",
      icon: Download,
      tone: "text-gold-500",
      surface: "bg-gold-500/10"
    }
  ];

  return (
    <AppShell
      viewer={viewer}
      currentPath="/relatorios"
      title="Relatorios operacionais"
      description="Esta tela entra como placeholder visual da futura area analitica, mantendo a navegacao e a hierarquia do produto alinhadas com o app antigo."
    >
      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Panel className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gold-500" />
            <p className="text-xs uppercase tracking-[0.28em] text-gold-600">Em construcao</p>
          </div>
          <h3 className="font-display text-3xl text-ink-950">A camada analitica volta como area propria.</h3>
          <p className="text-sm leading-7 text-ink-700">
            A navegacao ja passa a refletir a estrutura correta do produto: gestores e admins encontram a area de relatorios diretamente na topbar, como no app antigo, sem depender da dashboard para tudo.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {roadmapCards.map((item) => {
              const Icon = item.icon;

              return (
              <div className="rounded-lg border border-black/10 bg-sand-50/70 p-4" key={item.label}>
                <div className={cn("mb-3 flex h-10 w-10 items-center justify-center rounded-lg", item.surface)}>
                  <Icon className={cn("h-5 w-5", item.tone)} />
                </div>
                <p className="font-display text-lg text-ink-950">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-ink-700">{item.note}</p>
              </div>
              );
            })}
          </div>
        </Panel>

        <Panel className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-steel-500" />
            <p className="text-xs uppercase tracking-[0.28em] text-steel-600">Escopo previsto</p>
          </div>
          <div className="space-y-3">
            {[
              "Comparativo por periodo com KPI de produtividade e ociosidade.",
              "Graficos por cliente, linha e turno.",
              "Drilldown operacional com recorte detalhado dos eventos.",
              "Exportacao em CSV e trilha de leitura para lideranca."
            ].map((item) => (
              <div className="rounded-lg border border-black/10 bg-white p-4 text-sm leading-7 text-ink-700" key={item}>
                {item}
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-black/10 bg-sand-50/70 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-steel-500/10">
                <FileSpreadsheet className="h-5 w-5 text-steel-500" />
              </div>
              <div>
                <p className="font-display text-lg text-ink-950">Base preparada para a proxima etapa</p>
                <p className="mt-1 text-sm text-ink-700">A rota e a linguagem visual ficam prontas agora; a implementacao funcional entra na etapa seguinte.</p>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
