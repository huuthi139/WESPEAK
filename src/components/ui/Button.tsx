"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "glass";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      fullWidth,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden";

    const variants = {
      primary:
        "bg-primary-gradient text-white shadow-glow btn-3d glass-shine hover:shadow-glow-lg hover:brightness-110",
      secondary:
        "bg-secondary-gradient text-white shadow-glow-green btn-3d glass-shine hover:shadow-glow-green-lg hover:brightness-110",
      ghost: "hover:bg-white/[0.06] text-white active:bg-white/[0.1]",
      outline:
        "border border-white/[0.12] hover:border-primary/50 text-white hover:text-primary hover:bg-primary/[0.06] btn-3d",
      glass: "btn-glass text-white glass-shine",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-small",
      md: "px-5 py-2.5 text-body",
      lg: "px-6 py-3 text-h3",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2, transition: { duration: 0.15 } }}
        whileTap={{
          y: 2,
          scale: 0.97,
          transition: { duration: 0.1 },
        }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : null}
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
