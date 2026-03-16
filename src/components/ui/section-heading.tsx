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
      <p className="inline-flex rounded-full border border-ink-900/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-ink-700">
        {eyebrow}
      </p>
      <div className="space-y-3">
        <h2 className="font-display text-3xl leading-tight text-ink-950 sm:text-4xl">{title}</h2>
        <p className="text-base leading-7 text-ink-700 sm:text-lg">{description}</p>
      </div>
    </div>
  );
}
