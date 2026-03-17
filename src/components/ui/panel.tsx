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
        "rounded-lg border border-black/10 bg-white p-6 shadow-panel",
        className
      )}
    >
      {children}
    </section>
  );
}
