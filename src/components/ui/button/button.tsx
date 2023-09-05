import { ComponentProps, ReactNode, forwardRef } from "react"
import { container } from "./button.css"

export type ButtonProps = {
    icon?: ReactNode
}
export const Button = forwardRef<
    HTMLButtonElement,
    ComponentProps<"button"> & ButtonProps
>((props, ref) => {
    if (props.icon) {
        return (
            <button ref={ref} className={container} {...props}>
                {props.icon}
            </button>
        )
    }
    return <button ref={ref} className={container} {...props} />
})
