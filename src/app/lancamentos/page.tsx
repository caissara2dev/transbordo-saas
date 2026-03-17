import { AppShell } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Panel } from "@/components/ui/panel";
import { categoryLabels, pumps, shiftTypes } from "@/lib/domain/options";
import { requireWorkspaceViewer } from "@/lib/auth/session";
import { canManageWorkspace, organizationRoleLabels } from "@/lib/auth/permissions";

export default async function LancamentosPage() {
  const viewer = await requireWorkspaceViewer();
  const managerAccess = canManageWorkspace(viewer.activeMembership.role);
  const categoryEntries = Object.entries(categoryLabels);

  return (
    <AppShell
      viewer={viewer}
      currentPath="/lancamentos"
      title="Lancamentos operacionais"
      description="Superficie principal do operador para registrar eventos com cliente, turno, linha, categoria e historico operacional sob guardrails fixos."
    >
      <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <Panel className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-ember-500" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-ember-500">Captura operacional</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-ink-800">
              Data do turno
              <Input defaultValue="2026-03-17" readOnly />
            </label>
            <label className="space-y-2 text-sm font-medium text-ink-800">
              Turno
              <Input defaultValue={shiftTypes[0]} readOnly />
            </label>
            <label className="space-y-2 text-sm font-medium text-ink-800">
              Linha / bomba
              <Input defaultValue={pumps[0]} readOnly />
            </label>
            <label className="space-y-2 text-sm font-medium text-ink-800">
              Cliente
              <Input defaultValue="Cliente Alfa" readOnly />
            </label>
            <label className="space-y-2 text-sm font-medium text-ink-800">
              Inicio
              <Input defaultValue="06:00" readOnly />
            </label>
            <label className="space-y-2 text-sm font-medium text-ink-800">
              Fim
              <Input defaultValue="07:30" readOnly />
            </label>
          </div>

          <label className="block space-y-2 text-sm font-medium text-ink-800">
            Observacoes
            <textarea
              className="min-h-28 w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-ink-950 outline-none transition placeholder:text-ink-500 focus:border-ember-500 focus:ring-2 focus:ring-ember-500/15"
              defaultValue="Painel demonstrativo da futura tela de lancamento. Aqui entram validacoes, overlap checks e revisoes."
              readOnly
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" type="button">
              Salvar lancamento
            </Button>
            <Button size="lg" type="button" variant="secondary">
              Salvar e iniciar proximo
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-black/10 bg-sand-50/70 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-ink-500">Linhas fixas</p>
              <p className="mt-2 text-lg font-semibold text-ink-950">{pumps.join(" · ")}</p>
            </div>
            <div className="rounded-lg border border-black/10 bg-sand-50/70 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-ink-500">Turnos ativos</p>
              <p className="mt-2 text-lg font-semibold text-ink-950">{shiftTypes.join(" · ")}</p>
            </div>
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-gold-500" />
              <p className="text-xs uppercase tracking-[0.28em] text-gold-600">Categorias fixas</p>
            </div>
            {categoryEntries.map(([key, label], index) => (
              <div className="rounded-lg border border-black/10 bg-sand-50/60 p-4" key={key}>
                <div className="mb-2 flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: ["#e87b35", "#5b9a6f", "#d4a843", "#6b8fb5"][index % 4] }}
                  />
                  <p className="text-xs uppercase tracking-[0.24em] text-ink-500">{key.replaceAll("_", " ")}</p>
                </div>
                <p className="text-sm leading-7 text-ink-800">
                  {label}
                  {key === "PRODUCTIVE"
                    ? " exige cliente, placa, conteiner e contexto operacional."
                    : " permanece disponivel como classificacao governada de ociosidade ou parada."}
                </p>
              </div>
            ))}
          </Panel>

          <Panel className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-sage-500" />
              <p className="text-xs uppercase tracking-[0.28em] text-sage-600">Ultimos registros</p>
            </div>
            {[
              ["06:12", "Linha 02", "Evento produtivo iniciado", "Cliente Alfa"],
              ["05:48", "Linha 01", "Parada curta registrada", "Sem cliente"],
              ["05:30", "Linha 03", "Troca de turno concluida", "Equipe B"]
            ].map(([time, line, event, client]) => (
              <div className="flex items-start justify-between gap-4 rounded-lg border border-black/10 bg-white p-4" key={`${time}-${line}`}>
                <div>
                  <div className="font-display text-[16px] text-ink-950">{event}</div>
                  <div className="mt-1 text-sm text-ink-600">
                    {line} · {client}
                  </div>
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-ink-500">{time}</div>
              </div>
            ))}
          </Panel>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-ink-500">Limites de acesso</p>
          <h3 className="font-display text-3xl text-ink-950">
            {managerAccess ? "Revisao e correcao estao habilitadas." : "Este assento e focado em captura."}
          </h3>
          <p className="text-sm leading-7 text-ink-700">
            O perfil {organizationRoleLabels[viewer.activeMembership.role]} esta ativo neste workspace. Operadores mantem a tela enxuta; gestores e admins concentram revisao, disputa e controle avancado.
          </p>
        </Panel>
        <Panel className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-ink-500">Proxima entrega</p>
          <p className="text-sm leading-7 text-ink-700">
            O proximo marco operacional substitui este mock por board real de eventos, validacao de sobreposicao, fluxo create/edit e historico de revisoes.
          </p>
        </Panel>
      </div>
    </AppShell>
  );
}
