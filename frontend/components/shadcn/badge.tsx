import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-[#2A5CFF] focus-visible:ring-[3px] focus-visible:ring-[#2A5CFF]/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-[#141F33] aria-invalid:ring-[#141F33]/20 dark:aria-invalid:ring-[#141F33]/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-[#141F33] text-[#F8F9FB] [a]:hover:bg-[#141F33]/80",
        secondary: "bg-[#2A5CFF]/10 text-[#2A5CFF] [a]:hover:bg-[#2A5CFF]/20",
        destructive: "bg-[#141F33]/10 text-[#141F33] focus-visible:ring-[#141F33]/20 dark:bg-[#141F33]/20 dark:focus-visible:ring-[#141F33]/40 [a]:hover:bg-[#141F33]/20",
        outline: "border-[#141F33]/10 text-[#141F33] [a]:hover:bg-[#F8F9FB] [a]:hover:text-[#141F33]",
        ghost: "hover:bg-[#F8F9FB] hover:text-[#141F33] dark:hover:bg-[#141F33]/50",
        link: "text-[#141F33] underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
