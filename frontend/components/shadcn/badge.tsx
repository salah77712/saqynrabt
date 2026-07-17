import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-accent focus-visible:ring-[3px] focus-visible:ring-[#2A5CFF]/50 has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 aria-invalid:border-primary aria-invalid:ring-[#141F33]/20 dark:aria-invalid:ring-[#141F33]/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary dark:bg-dark-800 text-surface dark:text-surface [a]:hover:bg-primary [a]:dark:hover:bg-dark-700",
        secondary: "bg-accent/10 dark:bg-accent/20 text-accent [a]:hover:bg-accent/20 [a]:dark:hover:bg-accent/30",
        destructive: "bg-primary text-primary focus-visible:ring-[#141F33]/20 dark:bg-primary dark:focus-visible:ring-[#141F33]/40 [a]:hover:bg-primary",
        outline: "border-primary/10 dark:border-surface/20 text-primary dark:text-surface [a]:hover:bg-surface [a]:dark:hover:bg-dark-800 [a]:hover:text-primary [a]:dark:hover:text-surface",
        ghost: "hover:bg-surface hover:text-primary dark:hover:bg-dark-800 dark:hover:text-surface",
        link: "text-primary dark:text-surface underline-offset-4 hover:underline dark:hover:text-accent",
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
