export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-ember-500">
        <span className="h-px w-8 bg-ember-500" />
        {eyebrow}
      </p>
      <div className="space-y-3">
        <h2 className="font-display text-[32px] leading-tight text-ink-950 sm:text-[44px]">{title}</h2>
        <p className="max-w-xl font-body text-base leading-7 text-ink-600 sm:text-[17px]">{description}</p>
      </div>
    </div>
  );
}
