import * as Dialog from "@radix-ui/react-dialog"
import * as Portal from "@radix-ui/react-portal"
import { animated, useTransition } from "@react-spring/web"
import clsx from "clsx"
import { PropsWithChildren } from "react"
import { X } from "react-feather"
import { animationConfig } from "../../../animations"
import { Button } from "../button/button"
import { SizeVariant } from "../common"
import { content, overlay } from "./dialog.css"

export type DialogContainerProps = {
    open?: boolean
    onChange?: (open: boolean) => void
    variant?: SizeVariant
    className?: string
    closeBtn?: boolean
    root?: HTMLElement | null
}
function DialogContainer(props: PropsWithChildren<DialogContainerProps>) {
    const { onChange, open, children, className } = props
    const variant = props.variant ?? "large"
    const closeBtn = props.closeBtn ?? true

    const transitions = useTransition(open, {
        from: {
            overlayOpacity: 0,
            containerOpacity: 1,
            containerScale: 0.6,
        },
        enter: {
            overlayOpacity: 0.8,
            containerOpacity: 1,
            containerScale: 1,
        },
        leave: {
            overlayOpacity: 0,
            containerOpacity: 0,
            containerScale: 0.8,
        },
        config: animationConfig,
    })

    return (
        open && (
            <Portal.Root container={props.root}>
                <Dialog.Root onOpenChange={onChange} open={open}>
                    {transitions((styles, item) =>
                        item ? (
                            <>
                                <Dialog.Overlay forceMount asChild>
                                    <animated.div
                                        className={clsx(overlay)}
                                        style={{
                                            opacity: styles.overlayOpacity,
                                        }}
                                    />
                                </Dialog.Overlay>
                                <Dialog.Content
                                    forceMount
                                    asChild
                                    style={{
                                        transform: "translate(-50%, -50%)",
                                    }}
                                >
                                    <animated.div
                                        className={clsx(content({ variant }), {
                                            [`${className}`]: className,
                                        })}
                                        style={{
                                            scale: styles.containerScale,
                                            opacity: styles.containerOpacity,
                                        }}
                                    >
                                        {closeBtn && (
                                            <Dialog.Close asChild>
                                                <Button
                                                    style={{
                                                        margin: "0 0 0 auto",
                                                    }}
                                                >
                                                    <X color="white" />
                                                </Button>
                                            </Dialog.Close>
                                        )}
                                        {/* Content Below */}

                                        <section>{children}</section>
                                    </animated.div>
                                </Dialog.Content>
                            </>
                        ) : null,
                    )}
                </Dialog.Root>
            </Portal.Root>
        )
    )
}

export { DialogContainer }
