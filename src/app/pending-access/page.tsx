import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "@/lib/auth/actions";
import { membershipStatusLabels, organizationRoleLabels } from "@/lib/auth/permissions";
import { requireAuthenticatedViewer } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

export default async function PendingAccessPage() {
  const viewer = await requireAuthenticatedViewer();

  if (viewer.activeMembership) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Panel className="w-full max-w-3xl space-y-8">
        <div className="space-y-4">
          <p className="inline-flex rounded-full border border-ink-900/10 bg-sand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ink-700">
            Pending access
          </p>
          <div className="space-y-3">
            <h1 className="font-display text-5xl leading-none text-ink-950">Your account exists, but no active organization seat is attached yet.</h1>
            <p className="text-base leading-7 text-ink-700">
              This is expected in a sales-led rollout. An org admin or platform admin still needs to activate your membership before the workspace opens.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Panel className="space-y-4 border-ink-900/10 bg-sand-50/60 shadow-none">
            <p className="text-xs uppercase tracking-[0.28em] text-ink-500">Signed in as</p>
            <p className="text-lg font-semibold text-ink-950">{viewer.profile.fullName || viewer.profile.email}</p>
            <p className="text-sm text-ink-700">{viewer.profile.email}</p>
          </Panel>

          <Panel className="space-y-4 border-ink-900/10 bg-sand-50/60 shadow-none">
            <p className="text-xs uppercase tracking-[0.28em] text-ink-500">Current memberships</p>
            {viewer.memberships.length === 0 ? (
              <p className="text-sm leading-7 text-ink-700">No organization memberships exist for this account yet.</p>
            ) : (
              <div className="space-y-3">
                {viewer.memberships.map((membership) => (
                  <div className="rounded-3xl border border-ink-900/10 bg-white px-4 py-3" key={membership.id}>
                    <p className="font-semibold text-ink-950">{membership.organization.name}</p>
                    <p className="mt-1 text-sm text-ink-700">{organizationRoleLabels[membership.role]}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ink-500">
                      {membershipStatusLabels[membership.status]}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-ink-900/10 pt-6">
          <Link href="/">
            <Button type="button" variant="secondary">
              Back to product
            </Button>
          </Link>
          <form action={signOutAction}>
            <Button type="submit" variant="ghost">
              Sign out
            </Button>
          </form>
        </div>
      </Panel>
    </main>
  );
}
