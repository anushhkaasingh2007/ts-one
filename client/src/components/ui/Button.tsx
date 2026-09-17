import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-gov text-sm font-semibold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-navy text-white hover:bg-navy-700 shadow-gov",
        saffron: "bg-saffron text-navy-900 hover:bg-saffron-600 shadow-gov",
        outline:
          "border-2 border-navy text-navy hover:bg-navy hover:text-white dark:border-navy-300 dark:text-navy-200",
        ghost: "text-navy hover:bg-navy-50 dark:text-navy-200 dark:hover:bg-navy-900/40",
        green: "bg-green text-white hover:bg-green-700 shadow-gov",
        link: "text-navy underline-offset-4 hover:underline dark:text-navy-200",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-5",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
