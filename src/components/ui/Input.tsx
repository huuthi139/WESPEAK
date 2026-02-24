"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1 block text-small text-gray-400">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full rounded-md bg-dark-elevated border border-gray-700 px-4 py-2.5 text-body text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors",
              icon && "pl-10",
              error && "border-status-error",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-small text-status-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
