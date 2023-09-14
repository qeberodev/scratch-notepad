import { ComponentProps, ReactNode, forwardRef } from "react"
import { container } from "./button.css"
import clsx from "clsx"

export type ButtonProps = {
    icon?: ReactNode
}
export const Button = forwardRef<
    HTMLButtonElement,
    ComponentProps<"button"> & ButtonProps
>((props, ref) => {
    const { icon, children, className, ...rest } = props

    if (icon && !children) {
        return (
            <button ref={ref} className={container} {...props}>
                {icon}
            </button>
        )
    }

    return (
        <button ref={ref} className={clsx(container, className)} {...rest}>
            {icon}
            {children}
        </button>
    )
})
