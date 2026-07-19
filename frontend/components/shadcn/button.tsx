import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative overflow-hidden inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-xs font-bold whitespace-nowrap transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 outline-none select-none focus-visible:border-accent focus-visible:ring-[3px] focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-primary aria-invalid:ring-[3px] aria-invalid:ring-primary/20 dark:aria-invalid:border-primary/50 dark:aria-invalid:ring-primary/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 after:absolute after:inset-0 after:rounded-xl after:bg-white/20 after:scale-0 after:transition-transform after:duration-300 after:content-[''] active:after:scale-100",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-accent to-primary text-surface hover:from-accent hover:to-accent",
        outline:
          "btn-secondary border-primary/10 bg-surface hover:bg-gradient-to-b hover:from-background hover:to-background/80 hover:text-primary aria-expanded:bg-surface aria-expanded:text-primary dark:border-surface/20 dark:bg-primary dark:hover:bg-dark-700 dark:hover:text-surface",
        secondary:
          "btn-secondary bg-accent/10 text-accent hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-accent/10 aria-expanded:text-accent",
        ghost:
          "hover:bg-surface hover:text-primary aria-expanded:bg-surface aria-expanded:text-primary dark:hover:bg-primary",
        destructive:
          "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 hover:text-red-800 focus-visible:ring-red-300",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "min-h-11 py-3 px-6 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3",
        lg: "min-h-11 py-3 px-6 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
        icon: "size-8",
        "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
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
