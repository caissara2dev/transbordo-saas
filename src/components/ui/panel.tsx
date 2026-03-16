import { cn } from "@/lib/utils";

export function Panel({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-4xl border border-white/60 bg-white/78 p-6 shadow-panel backdrop-blur-xl",
        className
      )}
    >
      {children}
    </section>
  );
}
