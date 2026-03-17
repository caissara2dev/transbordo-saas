import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      className={cn(
        "h-12 w-full rounded-lg border border-black/10 bg-white px-4 font-body text-sm text-ink-950 shadow-sm outline-none transition placeholder:text-ink-500 focus:border-ember-500 focus:ring-2 focus:ring-ember-500/15",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

Input.displayName = "Input";
