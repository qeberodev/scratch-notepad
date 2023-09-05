import * as Dialog from "@radix-ui/react-dialog"
import { animated, easings, useTransition } from "@react-spring/web"
import { PropsWithChildren } from "react"
import { X } from "react-feather"
import { Button } from "../button/button"
import { content, overlay } from "./dialog.css"

type DialogContainerProps = {
    open?: boolean
    onChange?: (open: boolean) => void
}
function DialogContainer(props: PropsWithChildren<DialogContainerProps>) {
    const { onChange, open } = props

    const transitions = useTransition(open, {
        from: {
            overlayOpacity: 0,
            containerOpacity: 1,
            containerScale: 0.3,
            filter: "blur(0px)",
        },
        enter: {
            overlayOpacity: 0.8,
            containerOpacity: 1,
            containerScale: 1,
            filter: "blur(0px)",
        },
        leave: {
            overlayOpacity: 0,
            containerOpacity: 0,
            containerScale: 0.8,
            filter: "blur(10px)",
        },
        config: {
            tension: 170,
            friction: 14,
            bounce: 0,
            easing: easings.easeInOutCirc,
        },
    })

    return (
        <Dialog.Root onOpenChange={onChange} open={open}>
            {transitions((styles, item) =>
                item ? (
                    <>
                        <Dialog.Overlay forceMount asChild>
                            <animated.div
                                className={overlay}
                                style={{
                                    opacity: styles.overlayOpacity,
                                }}
                            />
                        </Dialog.Overlay>
                        <Dialog.Content
                            forceMount
                            asChild
                            style={{ transform: "translate(-50%, -50%)" }}
                        >
                            <animated.div
                                className={content}
                                style={{
                                    scale: styles.containerScale,
                                    opacity: styles.containerOpacity,
                                    filter: styles.filter,
                                }}
                            >
                                <Dialog.Close asChild>
                                    <Button style={{ margin: "0 0 0 auto" }}>
                                        <X color="white" />
                                    </Button>
                                </Dialog.Close>
                                {/* Content Below */}

                                <section style={{ color: "black" }}>
                                    Hello from inside the Dialog!
                                </section>
                            </animated.div>
                        </Dialog.Content>
                    </>
                ) : null,
            )}
        </Dialog.Root>
    )
}

export { DialogContainer }
