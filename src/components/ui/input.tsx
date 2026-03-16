import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      className={cn(
        "h-12 w-full rounded-2xl border border-ink-900/10 bg-white/80 px-4 text-sm text-ink-900 shadow-sm outline-none transition placeholder:text-ink-500 focus:border-ink-700 focus:ring-2 focus:ring-ink-700/10",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

Input.displayName = "Input";
