import { PropsWithChildren } from "react"
import { DialogContainer, DialogContainerProps } from "../ui/dialog"
import clsx from "clsx"
import { container } from "."

type AlertProps = {} & DialogContainerProps
export function Alert(props: PropsWithChildren<AlertProps>) {
    const { children, className, ...rest } = props

    return (
        <DialogContainer className={clsx(container, className)} {...rest}>
            {children}
        </DialogContainer>
    )
}
