import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 hover:scale-[1.02] active:scale-95 outline-none select-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-surface hover:bg-primary/90",
        secondary:
          "bg-accent text-surface hover:bg-accent/90",
        ghost:
          "bg-transparent text-primary hover:bg-primary/5",
        danger:
          "bg-danger text-surface hover:bg-danger/90",
      },
      size: {
        default: "min-h-11 py-3 px-6",
        sm: "h-9 px-4",
        lg: "min-h-12 py-3 px-8",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
