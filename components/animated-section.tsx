"use client";

import { useInView } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "blur-in";

interface AnimatedSectionProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  className?: string;
}

export function AnimatedSection({
  children,
  variant = "fade-up",
  delay = 0,
  className,
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView();

  const baseStyles = "transition-all duration-700 ease-out";

  const hiddenStyles: Record<AnimationVariant, string> = {
    "fade-up": "translate-y-8 opacity-0",
    "fade-down": "-translate-y-8 opacity-0",
    "fade-left": "translate-x-8 opacity-0",
    "fade-right": "-translate-x-8 opacity-0",
    "scale-up": "scale-95 opacity-0",
    "blur-in": "opacity-0 blur-sm",
  };

  const visibleStyles: Record<AnimationVariant, string> = {
    "fade-up": "translate-y-0 opacity-100",
    "fade-down": "translate-y-0 opacity-100",
    "fade-left": "translate-x-0 opacity-100",
    "fade-right": "translate-x-0 opacity-100",
    "scale-up": "scale-100 opacity-100",
    "blur-in": "opacity-100 blur-0",
  };

  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        isInView ? visibleStyles[variant] : hiddenStyles[variant],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
