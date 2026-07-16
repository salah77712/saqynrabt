import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-xs font-bold whitespace-nowrap transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 outline-none select-none focus-visible:border-[#2A5CFF] focus-visible:ring-[3px] focus-visible:ring-[#2A5CFF]/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-[#141F33] aria-invalid:ring-[3px] aria-invalid:ring-[#141F33]/20 dark:aria-invalid:border-[#141F33]/50 dark:aria-invalid:ring-[#141F33]/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-accent to-primary text-surface hover:from-accent hover:to-accent",
        outline:
          "btn-secondary border-[#141F33]/10 bg-[#F8F9FB] hover:bg-gradient-to-b hover:from-[#F8F9FB] hover:to-[#F1F3F5] hover:text-[#141F33] aria-expanded:bg-[#F8F9FB] aria-expanded:text-[#141F33] dark:border-[#141F33]/10 dark:bg-[#141F33] dark:hover:bg-[#141F33]",
        secondary:
          "btn-secondary bg-[#2A5CFF]/10 text-[#2A5CFF] hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-[#2A5CFF]/10 aria-expanded:text-[#2A5CFF]",
        ghost:
          "hover:bg-[#F8F9FB] hover:text-[#141F33] aria-expanded:bg-[#F8F9FB] aria-expanded:text-[#141F33] dark:hover:bg-[#141F33]",
        destructive:
          "bg-[#141F33] text-[#141F33] hover:bg-[#141F33] focus-visible:border-[#141F33]/40 focus-visible:ring-[#141F33]/20 dark:bg-[#141F33] dark:hover:bg-[#141F33] dark:focus-visible:ring-[#141F33]/40",
        link: "text-[#141F33] underline-offset-4 hover:underline",
      },
      size: {
        default:
          "min-h-11 py-3 px-6 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        lg: "min-h-11 py-3 px-6 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
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
