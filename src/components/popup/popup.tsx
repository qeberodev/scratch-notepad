import * as Popover from "@radix-ui/react-popover"
import { PropsWithChildren } from "react"
import { container } from "./popup.css"

export type PopupProps = {
    trigger: React.ReactNode
    open: boolean
}
export const Popup = (props: PropsWithChildren<PopupProps>) => {
    const { children, open, trigger } = props

    return (
        <Popover.Root open={open}>
            <Popover.Trigger asChild>{trigger}</Popover.Trigger>
            <Popover.Content className={container}>{children}</Popover.Content>
        </Popover.Root>
    )
}
