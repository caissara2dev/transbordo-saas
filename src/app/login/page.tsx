import Link from "next/link";
import { redirect } from "next/navigation";
import { signInAction } from "@/lib/auth/actions";
import { getSessionResolution } from "@/lib/auth/session";
import { isDemoModeEnabled } from "@/lib/demo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

const errorMessages: Record<string, string> = {
  invalid_credentials: "The email or password is incorrect.",
  missing_fields: "Fill in both email and password to continue.",
  setup: "Supabase is not configured yet for this environment."
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
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Panel className="w-full max-w-xl space-y-8">
        <div className="space-y-4">
          <p className="inline-flex rounded-full border border-ink-900/10 bg-sand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ink-700">
            Sign in
          </p>
          <div className="space-y-3">
            <h1 className="font-display text-5xl leading-none text-ink-950">Access your operations workspace.</h1>
            <p className="text-base leading-7 text-ink-700">
              Use your invited work email to enter the SaaS workspace. Organization access is still controlled manually in the first release.
            </p>
          </div>
        </div>

        {!isConfigured ? (
          <div className="rounded-[1.8rem] border border-amber-500/20 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-900">
            Configure <code className="rounded bg-white px-2 py-1 text-xs">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="rounded bg-white px-2 py-1 text-xs">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> before enabling login in this environment.
          </div>
        ) : null}

        {demoMode ? (
          <div className="rounded-[1.8rem] border border-emerald-500/20 bg-emerald-50 px-5 py-4 text-sm leading-7 text-emerald-900">
            Local demo mode is enabled. You can open the protected workspace without Supabase or database data.
          </div>
        ) : null}

        {errorMessage ? (
          <div className="rounded-[1.8rem] border border-rose-500/20 bg-rose-50 px-5 py-4 text-sm leading-7 text-rose-900">
            {errorMessage}
          </div>
        ) : null}

        <form action={signInAction} className="space-y-4">
          <label className="block space-y-2 text-sm font-medium text-ink-800">
            Work email
            <Input name="email" placeholder="name@company.com" type="email" />
          </label>
          <label className="block space-y-2 text-sm font-medium text-ink-800">
            Password
            <Input name="password" placeholder="Enter your password" type="password" />
          </label>
          <Button className="w-full" disabled={!isConfigured} type="submit">
            Continue
          </Button>
        </form>

        {demoMode ? (
          <Button asChild className="w-full" size="lg" variant="secondary">
            <Link href="/dashboard">Enter demo workspace</Link>
          </Button>
        ) : null}

        <div className="flex items-center justify-between border-t border-ink-900/10 pt-6 text-sm text-ink-700">
          <Link className="font-medium text-ink-950 underline-offset-4 hover:underline" href="/">
            Back to product
          </Link>
          <span>Invite-controlled onboarding in v1</span>
        </div>
      </Panel>
    </main>
  );
}
