import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 cursor-pointer select-none";

  const variants = {
    primary: "bg-brand-deep text-white hover:bg-brand-mid active:scale-95",
    secondary:
      "bg-transparent text-brand-deep border-2 border-brand-deep hover:bg-brand-light active:scale-95",
    gold: "bg-gold text-white hover:opacity-90 active:scale-95",
    ghost: "text-gray-600 hover:text-brand-deep underline underline-offset-2",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg",
  };

  const disabledStyles =
    loading || disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : "";

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${widthClass} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>جاري التحميل...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
