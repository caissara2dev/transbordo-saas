import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

export default function LoginPage() {
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
              This is a placeholder auth surface for the rebuild baseline. Final authentication flow will connect to the organization invite model.
            </p>
          </div>
        </div>

        <form className="space-y-4">
          <label className="block space-y-2 text-sm font-medium text-ink-800">
            Work email
            <Input placeholder="name@company.com" type="email" />
          </label>
          <label className="block space-y-2 text-sm font-medium text-ink-800">
            Password
            <Input placeholder="Enter your password" type="password" />
          </label>
          <Button className="w-full" type="submit">
            Continue
          </Button>
        </form>

        <div className="flex items-center justify-between border-t border-ink-900/10 pt-6 text-sm text-ink-700">
          <Link className="font-medium text-ink-950 underline-offset-4 hover:underline" href="/">
            Back to product
          </Link>
          <span>Sales-led onboarding only in v1</span>
        </div>
      </Panel>
    </main>
  );
}
