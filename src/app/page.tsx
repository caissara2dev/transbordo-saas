import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle,
  ChevronRight,
  Clock3,
  ClipboardList,
  Database,
  Download,
  Gauge,
  Lock,
  Shield,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

const featureCards = [
  {
    icon: ClipboardList,
    label: "REGISTRO",
    title: "Eventos por turno",
    description: "Registre cada operacao de transbordo com turno, operador, linha e cliente vinculados ao contexto correto.",
    color: "text-ember-500",
    glow: "bg-ember-500/10"
  },
  {
    icon: Gauge,
    label: "MONITORAMENTO",
    title: "Controle de linhas",
    description: "Visualize qual linha esta ativa, parada ou em manutencao com uma leitura operacional clara.",
    color: "text-gold-500",
    glow: "bg-gold-500/10"
  },
  {
    icon: Clock3,
    label: "CLASSIFICACAO",
    title: "Produtivo vs. ocioso",
    description: "Classifique tempos operacionais e exponha gargalos por turno, cliente e supervisor.",
    color: "text-sage-500",
    glow: "bg-sage-500/10"
  },
  {
    icon: Users,
    label: "GESTAO",
    title: "Clientes e equipes",
    description: "Cada organizacao gerencia seus clientes, membros, convites e papeis sob a mesma governanca.",
    color: "text-steel-500",
    glow: "bg-steel-500/10"
  },
  {
    icon: BarChart3,
    label: "ANALISE",
    title: "KPIs e indicadores",
    description: "Dashboards, drilldowns e exportacoes transformam o registro operacional em decisao gerencial.",
    color: "text-ember-500",
    glow: "bg-ember-500/10"
  },
  {
    icon: Shield,
    label: "GOVERNANCA",
    title: "Permissoes e auditoria",
    description: "Cada acao fica vinculada a um papel, responsavel, timestamp e trilha de revisao.",
    color: "text-sage-500",
    glow: "bg-sage-500/10"
  },
  {
    icon: Database,
    label: "DADOS",
    title: "Relatorios e exportacao",
    description: "Dados confiaveis por periodo, cliente e operacao, prontos para exportar e discutir com a lideranca.",
    color: "text-gold-500",
    glow: "bg-gold-500/10"
  },
  {
    icon: Lock,
    label: "SAAS B2B",
    title: "Tenant por organizacao",
    description: "O novo produto nasce multi-organizacao, com onboarding comercial e isolamento de clientes desde o inicio.",
    color: "text-steel-500",
    glow: "bg-steel-500/10"
  }
];

const problems = [
  "Registros em planilhas e cadernos",
  "Zero visibilidade entre turnos",
  "Dados inconsistentes e duplicados",
  "Sem controle de quem fez o que",
  "Relatorios manuais e atrasados",
  "Tempos ociosos invisiveis"
];

const solutions = [
  "Registros padronizados e digitais",
  "Visibilidade operacional em tempo real",
  "Dados validados e centralizados",
  "Governanca com papeis e trilha de auditoria",
  "Relatorios automaticos com KPIs",
  "Classificacao produtivo vs. ocioso"
];

const benefitCards = [
  {
    icon: Target,
    title: "Padronizacao operacional",
    description: "Um processo unico, documentado e auditavel para toda a operacao.",
    metric: "100%"
  },
  {
    icon: Zap,
    title: "Visibilidade em tempo real",
    description: "Saiba o que aconteceu em cada turno e o que precisa de acao agora.",
    metric: "Live"
  },
  {
    icon: TrendingUp,
    title: "Mais produtividade",
    description: "Identifique gargalos e reduza ociosidade com base em dados concretos.",
    metric: "+23%"
  },
  {
    icon: ShieldCheck,
    title: "Conformidade e auditoria",
    description: "Toda alteracao fica rastreada por usuario, horario e contexto operacional.",
    metric: "Zero"
  }
];

const governanceItems = [
  {
    time: "14:32:08",
    actor: "Supervisor Patio",
    action: "Aprovou registro #1847",
    role: "Supervisor",
    color: "bg-sage-500"
  },
  {
    time: "14:28:15",
    actor: "Operador Turno B",
    action: "Editou evento na Linha 02",
    role: "Operador",
    color: "bg-gold-500"
  },
  {
    time: "14:15:42",
    actor: "Gerente Unidade",
    action: "Exportou relatorio mensal",
    role: "Gerente",
    color: "bg-steel-500"
  },
  {
    time: "14:02:31",
    actor: "Operador Turno A",
    action: "Novo lancamento para Cliente Alfa",
    role: "Operador",
    color: "bg-ember-500"
  }
];

const permissionRows = [
  { role: "Administrador", items: ["Configurar", "Gerenciar", "Aprovar", "Exportar"] },
  { role: "Supervisor", items: ["Aprovar", "Visualizar", "Exportar"] },
  { role: "Operador", items: ["Registrar", "Visualizar"] },
  { role: "Auditor", items: ["Visualizar", "Exportar"] }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-sand-50 text-ink-950">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link className="flex items-center gap-3" href="/">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-ember-500">
              <span className="font-display text-sm font-bold text-white">TC</span>
            </div>
            <span className="font-display text-[15px] font-semibold text-ink-950">Transbordo Cloud</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            {[
              ["#problema", "Problema"],
              ["#funcionalidades", "Funcionalidades"],
              ["#relatorios", "Relatorios"],
              ["#governanca", "Governanca"],
              ["#beneficios", "Beneficios"]
            ].map(([href, label]) => (
              <a className="font-body text-[13px] uppercase tracking-wide text-ink-600 transition-colors hover:text-ink-950" href={href} key={href}>
                {label}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <Link className="font-body text-[13px] text-ink-600 transition-colors hover:text-ink-950" href="/login">
              Entrar
            </Link>
            <Button asChild size="sm">
              <Link href="/login">
                Agendar demo
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-white pt-16">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute left-1/2 top-0 h-[560px] w-[760px] -translate-x-1/2 rounded-full bg-ember-500/5 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-24 lg:px-8 lg:pb-24 lg:pt-32">
          <div className="mb-8 flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-sage-500" />
              <span className="font-body text-[12px] uppercase tracking-wide text-ink-600">Plataforma operacional ativa</span>
            </div>
          </div>

          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="mb-6 max-w-3xl font-display text-[42px] leading-[1.02] tracking-tight text-ink-950 lg:text-[64px]">
                Centro de comando
                <br />
                <span className="text-ember-500">para transbordo</span>
                <br />
                operacional
              </h1>
              <p className="mb-10 max-w-xl font-body text-[17px] leading-8 text-ink-600">
                Registre eventos por turno, monitore linhas, classifique tempos produtivos e ociosos e acompanhe KPIs em um SaaS B2B construido para operacoes industriais.
              </p>
              <div className="mb-12 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/login">
                    Agendar demonstracao
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <a href="#funcionalidades">Ver funcionalidades</a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Activity, label: "Monitoramento em tempo real", color: "text-ember-500" },
                  { icon: Clock3, label: "Controle por turno", color: "text-gold-500" },
                  { icon: Shield, label: "Governanca de acesso", color: "text-sage-500" }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2" key={item.label}>
                      <Icon className={`h-3.5 w-3.5 ${item.color}`} />
                      <span className="font-body text-[12px] text-ink-600">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-lg border border-black/12 bg-white shadow-lg">
                <div className="flex items-center justify-between border-b border-black/8 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-sage-500" />
                    <span className="font-display text-[12px] font-medium uppercase tracking-[0.16em] text-ink-600">
                      Painel operacional - Turno A
                    </span>
                  </div>
                  <span className="font-body text-[11px] text-ink-500">17/03/2026 06:00</span>
                </div>
                <div className="space-y-4 p-5">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Tempo produtivo", value: "87.3%", color: "text-sage-500" },
                      { label: "Linhas ativas", value: "12/14", color: "text-ember-500" },
                      { label: "Volume (m³)", value: "4,230", color: "text-gold-500" }
                    ].map((kpi) => (
                      <div className="rounded-lg border border-black/8 bg-sand-50 p-3" key={kpi.label}>
                        <div className="mb-1 font-body text-[10px] uppercase tracking-[0.14em] text-ink-500">{kpi.label}</div>
                        <div className={`font-display text-[22px] font-bold tracking-tight ${kpi.color}`}>{kpi.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-black/8 bg-sand-50 p-3">
                    <div className="mb-2 font-body text-[10px] uppercase tracking-[0.14em] text-ink-500">Linha do tempo do turno</div>
                    <div className="flex h-6 overflow-hidden rounded gap-[2px]">
                      <div className="w-[35%] bg-sage-500" />
                      <div className="w-[12%] bg-gold-500" />
                      <div className="w-[20%] bg-sage-500" />
                      <div className="w-[8%] bg-ember-500" />
                      <div className="w-[15%] bg-sage-500" />
                      <div className="w-[10%] bg-sand-400" />
                    </div>
                    <div className="mt-2 flex justify-between font-body text-[10px] text-ink-500">
                      <span>06:00</span>
                      <span>12:00</span>
                      <span>18:00</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-black/8 bg-sand-50 p-3">
                    <div className="mb-2 font-body text-[10px] uppercase tracking-[0.14em] text-ink-500">Ultimos eventos</div>
                    <div className="space-y-2">
                      {[
                        ["14:32", "Linha 03 - Parada programada", "bg-steel-500"],
                        ["14:15", "Transbordo #847 - Concluido", "bg-sage-500"],
                        ["13:48", "Cliente Alfa - Novo registro", "bg-ember-500"]
                      ].map(([time, item, color]) => (
                        <div className="flex items-center justify-between" key={`${time}-${item}`}>
                          <div className="flex items-center gap-2">
                            <div className={`h-1.5 w-1.5 rounded-full ${color}`} />
                            <span className="font-body text-[11px] text-ink-950/80">{item}</span>
                          </div>
                          <span className="font-body text-[10px] text-ink-500">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 rounded-lg border border-black/12 bg-white px-4 py-3 shadow-float">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-500/10">
                    <Shield className="h-5 w-5 text-sage-500" />
                  </div>
                  <div>
                    <div className="font-display text-[13px] font-semibold text-ink-950">100% rastreavel</div>
                    <div className="font-body text-[11px] text-ink-600">Cada registro auditado</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-black/8" />
      </section>

      <section className="bg-white py-20 lg:py-28" id="problema">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5">
              <span className="font-body text-[11px] uppercase tracking-[0.2em] text-ember-500">Antes e depois</span>
            </div>
            <h2 className="font-display text-[34px] leading-tight text-ink-950 lg:text-[48px]">
              Do controle fragmentado ao
              <br />
              <span className="text-ember-500">comando operacional centralizado</span>
            </h2>
          </div>

          <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
            <div className="rounded-lg border border-black/10 bg-sand-50 p-8">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-danger-500/10">
                  <AlertTriangle className="h-5 w-5 text-danger-500" />
                </div>
                <div>
                  <div className="font-display text-[18px] font-semibold text-ink-950">Sem sistema</div>
                  <div className="font-body text-[12px] text-ink-600">Controle fragmentado e manual</div>
                </div>
              </div>
              <div className="space-y-4">
                {problems.map((item) => (
                  <div className="flex items-start gap-3" key={item}>
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-danger-500/10">
                      <AlertTriangle className="h-3 w-3 text-danger-500" />
                    </div>
                    <span className="font-body text-[14px] text-ink-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden items-center justify-center px-8 lg:flex">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-ember-500/30 bg-ember-500/10">
                <ArrowRight className="h-6 w-6 text-ember-500" />
              </div>
            </div>

            <div className="rounded-lg border border-ember-500/30 bg-white p-8 shadow-sm">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-500/10">
                  <CheckCircle className="h-5 w-5 text-sage-500" />
                </div>
                <div>
                  <div className="font-display text-[18px] font-semibold text-ink-950">Transbordo Cloud</div>
                  <div className="font-body text-[12px] text-ink-600">Comando centralizado e digital</div>
                </div>
              </div>
              <div className="space-y-4">
                {solutions.map((item) => (
                  <div className="flex items-start gap-3" key={item}>
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-500/10">
                      <CheckCircle className="h-3 w-3 text-sage-500" />
                    </div>
                    <span className="font-body text-[14px] text-ink-950">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-sand-50 py-20 lg:py-28" id="funcionalidades">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-ember-500" />
              <span className="font-body text-[11px] uppercase tracking-[0.2em] text-ember-500">Funcionalidades</span>
            </div>
            <h2 className="max-w-3xl font-display text-[34px] leading-tight text-ink-950 lg:text-[48px]">
              Operacoes, governanca e relatorios em uma interface
            </h2>
            <p className="mt-4 max-w-xl font-body text-[16px] leading-7 text-ink-600">
              Cada modulo foi desenhado para uma equipe de transbordo que precisa registrar, supervisionar e provar o que aconteceu.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((feature) => {
              const Icon = feature.icon;
              return (
                <div className="group relative rounded-lg border border-black/10 bg-white p-6 transition-all duration-300 hover:border-black/20 hover:shadow-md" key={feature.title}>
                  <div className="absolute left-6 right-6 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="mb-4 flex items-center gap-2">
                    <div className={`flex h-9 w-9 items-center justify-center rounded ${feature.glow}`}>
                      <Icon className={`h-4 w-4 ${feature.color}`} />
                    </div>
                    <span className={`font-body text-[9px] uppercase tracking-[0.15em] ${feature.color}`}>{feature.label}</span>
                  </div>
                  <h3 className="mb-2 font-display text-[16px] font-semibold text-ink-950">{feature.title}</h3>
                  <p className="font-body text-[13px] leading-6 text-ink-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-black/8 bg-white py-20 lg:py-28" id="relatorios">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-gold-500" />
                <span className="font-body text-[11px] uppercase tracking-[0.2em] text-gold-500">Relatorios e indicadores</span>
              </div>
              <h2 className="font-display text-[34px] leading-tight text-ink-950 lg:text-[48px]">
                Dados que dirigem
                <br />
                <span className="text-gold-500">decisoes operacionais</span>
              </h2>
            </div>
            <div className="flex items-end">
              <p className="font-body text-[16px] leading-8 text-ink-600">
                KPIs em tempo real, graficos de evolucao, analise por drilldown e exportacao em formatos prontos para reunioes operacionais.
              </p>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              ["Eficiencia operacional", "87.3%", "+2.1%", "text-sage-500"],
              ["Volume mensal (m³)", "42,380", "+12.4%", "text-ember-500"],
              ["Tempo medio", "4h 23m", "-8.2%", "text-gold-500"],
              ["Taxa de ociosidade", "12.7%", "-3.1%", "text-sage-500"]
            ].map(([label, value, change, tone]) => (
              <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm" key={label}>
                <div className="mb-3 font-body text-[11px] uppercase tracking-[0.14em] text-ink-500">{label}</div>
                <div className="flex items-end gap-3">
                  <span className={`font-display text-[30px] font-bold tracking-tight ${tone}`}>{value}</span>
                  <span className="mb-1 font-body text-[12px] text-sage-500">{change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-black/8 px-5 py-3">
                <span className="font-display text-[13px] font-medium text-ink-950">Produtivo vs. ocioso (%)</span>
                <div className="flex items-center gap-2">
                  <div className="rounded border border-black/10 bg-sand-50 px-2.5 py-1 font-body text-[10px] text-ink-600">Semana</div>
                  <Download className="h-3.5 w-3.5 text-ink-500" />
                </div>
              </div>
              <div className="p-5">
                <div className="grid gap-3">
                  {[
                    ["Seg", 82, 18],
                    ["Ter", 91, 9],
                    ["Qua", 76, 24],
                    ["Qui", 88, 12],
                    ["Sex", 94, 6]
                  ].map(([day, productive, idle]) => (
                    <div className="grid grid-cols-[36px_1fr] items-center gap-3" key={day}>
                      <span className="font-body text-[11px] text-ink-600">{day}</span>
                      <div className="flex h-6 overflow-hidden rounded">
                        <div className="bg-sage-500" style={{ width: `${productive}%` }} />
                        <div className="bg-sand-400" style={{ width: `${idle}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-black/8 px-5 py-3">
                <span className="font-display text-[13px] font-medium text-ink-950">Volume acumulado (m³)</span>
                <div className="flex items-center gap-2">
                  <div className="rounded border border-black/10 bg-sand-50 px-2.5 py-1 font-body text-[10px] text-ink-600">8 meses</div>
                  <BarChart3 className="h-3.5 w-3.5 text-ember-500" />
                </div>
              </div>
              <div className="space-y-4 p-5">
                <div className="flex h-44 items-end gap-3">
                  {[32, 41, 38, 52, 48, 61, 56, 72].map((value, index) => (
                    <div className="flex flex-1 flex-col items-center justify-end gap-2" key={value}>
                      <div className="w-full rounded-t bg-gradient-to-t from-ember-500/20 to-ember-500" style={{ height: `${value * 2}px` }} />
                      <span className="font-body text-[10px] text-ink-500">{["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago"][index]}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-ember-500/15 bg-ember-500/5 px-4 py-3 font-body text-[12px] text-ink-600">
                  O painel final vai manter esse mesmo tom visual, mas conectado aos relatorios reais do produto.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/8 bg-sand-50 py-20 lg:py-28" id="governanca">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-sage-500" />
                <span className="font-body text-[11px] uppercase tracking-[0.2em] text-sage-500">Governanca e auditoria</span>
              </div>
              <h2 className="font-display text-[34px] leading-tight text-ink-950 lg:text-[48px]">
                Cada acao rastreada.
                <br />
                <span className="text-sage-500">Cada acesso controlado.</span>
              </h2>
            </div>
            <div className="flex items-end">
              <p className="font-body text-[16px] leading-8 text-ink-600">
                Defina quem pode fazer o que. Cada registro possui responsavel, timestamp e status de aprovacao. Rastreabilidade completa para operacoes B2B.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm lg:col-span-3">
              <div className="flex items-center justify-between border-b border-black/8 px-5 py-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-sage-500" />
                  <span className="font-display text-[13px] font-medium text-ink-950">Log de auditoria</span>
                </div>
                <span className="font-body text-[10px] text-ink-500">Atualizado em tempo real</span>
              </div>
              <div className="divide-y divide-black/5">
                {governanceItems.map((entry) => (
                  <div className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-sand-50" key={`${entry.time}-${entry.action}`}>
                    <span className="w-16 shrink-0 font-body text-[11px] text-ink-500">{entry.time}</span>
                    <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${entry.color}`} />
                    <div className="flex-1">
                      <span className="font-body text-[13px] text-ink-950">{entry.action}</span>
                    </div>
                    <span className="shrink-0 font-body text-[11px] text-ink-600">{entry.actor}</span>
                    <span className="hidden w-20 shrink-0 text-right font-body text-[10px] text-ink-500 sm:block">{entry.role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm lg:col-span-2">
              <div className="flex items-center gap-2 border-b border-black/8 px-5 py-3">
                <Lock className="h-3.5 w-3.5 text-gold-500" />
                <span className="font-display text-[13px] font-medium text-ink-950">Matriz de permissoes</span>
              </div>
              <div className="space-y-4 p-5">
                {permissionRows.map((row) => (
                  <div key={row.role}>
                    <div className="mb-2 font-display text-[13px] font-semibold text-ink-950">{row.role}</div>
                    <div className="ml-4 flex flex-wrap gap-1.5">
                      {row.items.map((item) => (
                        <span className="rounded border border-black/10 bg-sand-50 px-2.5 py-1 font-body text-[10px] text-ink-600" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/8 bg-white py-20 lg:py-28" id="beneficios">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-ember-500" />
              <span className="font-body text-[11px] uppercase tracking-[0.2em] text-ember-500">Valor entregue</span>
              <div className="h-px w-8 bg-ember-500" />
            </div>
            <h2 className="font-display text-[34px] leading-tight text-ink-950 lg:text-[48px]">
              Resultados mensuraveis
              <br />
              para sua operacao
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefitCards.map((item) => {
              const Icon = item.icon;
              return (
                <div className="rounded-lg border border-black/10 bg-white p-6 transition-all duration-300 hover:border-black/20 hover:shadow-md" key={item.title}>
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ember-500/10">
                      <Icon className="h-5 w-5 text-ember-500" />
                    </div>
                    <div className="text-right">
                      <div className="font-display text-[24px] font-bold text-ember-500">{item.metric}</div>
                    </div>
                  </div>
                  <h3 className="mb-2 font-display text-[16px] font-semibold text-ink-950">{item.title}</h3>
                  <p className="font-body text-[13px] leading-6 text-ink-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative border-t border-black/8 bg-sand-50 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-ember-500/5 blur-[100px]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-ember-500/30 bg-ember-500/5 px-4 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-ember-500" />
            <span className="font-body text-[11px] uppercase tracking-[0.2em] text-ember-500">Pronto para comecar?</span>
          </div>
          <h2 className="mb-6 font-display text-[38px] leading-tight text-ink-950 lg:text-[56px]">
            Sua operacao merece
            <br />
            um centro de comando
          </h2>
          <p className="mx-auto mb-10 max-w-2xl font-body text-[17px] leading-8 text-ink-600">
            Agende uma demonstracao e veja como o novo produto conecta lancamentos, governanca e relatorios em um unico SaaS B2B.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/login">
                Agendar demonstracao
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/lancamentos">Ver area do operador</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
