import Link from "next/link";
import { redirect } from "next/navigation";
import { signInAction } from "@/lib/auth/actions";
import { getSessionResolution } from "@/lib/auth/session";
import { isDemoModeEnabled } from "@/lib/demo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

const errorMessages: Record<string, string> = {
  invalid_credentials: "Email ou senha incorretos.",
  missing_fields: "Preencha email e senha para continuar.",
  setup: "Supabase ainda nao foi configurado neste ambiente."
};

function resolveErrorMessage(value: string | string[] | undefined) {
  if (!value) {
    return null;
  }

  const error = Array.isArray(value) ? value[0] : value;
  return errorMessages[error] ?? decodeURIComponent(error);
}

export default async function LoginPage({
  searchParams
}: {
  searchParams?: Promise<{ error?: string | string[] }>;
}) {
  const session = await getSessionResolution();

  if (session.state === "authenticated") {
    if (session.viewer.activeMembership) {
      redirect("/dashboard");
    }

    redirect("/pending-access" as never);
  }

  const params = (await searchParams) ?? {};
  const errorMessage = resolveErrorMessage(params.error);
  const isConfigured = session.state !== "unconfigured";
  const demoMode = isDemoModeEnabled();

  return (
    <main className="relative min-h-screen overflow-hidden bg-sand-50 px-4 py-12">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />
      <div className="absolute left-1/2 top-0 h-[500px] w-[720px] -translate-x-1/2 rounded-full bg-ember-500/5 blur-[120px]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden lg:block">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-ember-500">
              <span className="font-display text-sm font-bold text-white">TC</span>
            </div>
            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.32em] text-ink-500">Transbordo Cloud</p>
              <p className="font-display text-xl text-ink-950">Sistema operacional para transbordo</p>
            </div>
          </div>

          <div className="max-w-xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-ember-500" />
              <span className="font-body text-[11px] uppercase tracking-[0.32em] text-ember-500">Acesso governado</span>
            </div>
            <h1 className="font-display text-[56px] leading-[0.98] tracking-tight text-ink-950">
              Acesse sua
              <br />
              operacao com
              <br />
              contexto completo.
            </h1>
            <p className="max-w-lg text-base leading-8 text-ink-600">
              O acesso continua controlado por convite e aprovacao manual. Isso preserva governanca, trilha de auditoria e isolamento por organizacao desde o primeiro login.
            </p>
          </div>

          <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
            {[
              ["Turnos", "Registro por turno, linha e cliente."],
              ["Auditoria", "Toda acao fica ligada ao usuario."],
              ["Relatorios", "KPIs e exportacao por organizacao."]
            ].map(([title, body], index) => (
              <div className="rounded-lg border border-black/10 bg-white p-4 shadow-panel" key={title}>
                <div className="mb-3 h-1 w-10 rounded-full bg-ember-500" style={{ opacity: 1 - index * 0.18 }} />
                <p className="font-display text-[16px] text-ink-950">{title}</p>
                <p className="mt-2 text-sm leading-6 text-ink-600">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <Panel className="w-full max-w-xl justify-self-end space-y-8">
          <div className="space-y-4">
            <p className="inline-flex rounded-full border border-black/10 bg-sand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ink-700">
              Entrar
            </p>
            <div className="space-y-3">
              <h1 className="font-display text-5xl leading-none text-ink-950">Acesse seu workspace.</h1>
              <p className="text-base leading-7 text-ink-700">
                Use seu email corporativo para abrir o ambiente da sua organizacao. No v1, aprovacao e liberacao continuam manuais.
              </p>
            </div>
          </div>

          {!isConfigured ? (
            <div className="rounded-lg border border-gold-500/20 bg-gold-500/10 px-5 py-4 text-sm leading-7 text-gold-800">
              Configure <code className="rounded bg-white px-2 py-1 text-xs">NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
              <code className="rounded bg-white px-2 py-1 text-xs">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> antes de habilitar o login neste ambiente.
            </div>
          ) : null}

          {demoMode ? (
            <div className="rounded-lg border border-sage-500/20 bg-sage-500/10 px-5 py-4 text-sm leading-7 text-sage-800">
              O modo demo local esta ativo. Voce pode abrir o workspace protegido sem Supabase nem dados reais.
            </div>
          ) : null}

          {errorMessage ? (
            <div className="rounded-lg border border-danger-500/20 bg-danger-500/10 px-5 py-4 text-sm leading-7 text-danger-600">
              {errorMessage}
            </div>
          ) : null}

          <form action={signInAction} className="space-y-4">
            <label className="block space-y-2 text-sm font-medium text-ink-800">
              Email corporativo
              <Input name="email" placeholder="nome@empresa.com" type="email" />
            </label>
            <label className="block space-y-2 text-sm font-medium text-ink-800">
              Senha
              <Input name="password" placeholder="Digite sua senha" type="password" />
            </label>
            <Button className="w-full" disabled={!isConfigured} size="lg" type="submit">
              Continuar
            </Button>
          </form>

          {demoMode ? (
            <Button asChild className="w-full" size="lg" variant="secondary">
              <Link href="/dashboard">Entrar no workspace demo</Link>
            </Button>
          ) : null}

          <div className="flex items-center justify-between border-t border-black/10 pt-6 text-sm text-ink-700">
            <Link className="font-medium text-ink-950 underline-offset-4 hover:underline" href="/">
              Voltar para o site
            </Link>
            <span>Onboarding comercial no v1</span>
          </div>
        </Panel>
      </div>
    </main>
  );
}
