import * as Dialog from "@radix-ui/react-dialog"
import { close, content, description, overlay, title } from "./dialog.css"
import { useTransition, animated, easings } from "@react-spring/web"
import { PropsWithChildren } from "react"
import { X } from "react-feather"

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
            overlayOpacity: 0.7,
            containerOpacity: 1,
            containerScale: 1,
            filter: "blur(0px)",
        },
        leave: {
            overlayOpacity: 0,
            containerOpacity: 0,
            containerScale: 0.6,
            filter: "blur(10px)",
        },
        config: {
            tension: 170,
            friction: 14,
            bounce: 0.3,
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
                        <Dialog.Content forceMount asChild>
                            <animated.div
                                className={content}
                                style={{
                                    scale: styles.containerScale,
                                    opacity: styles.containerOpacity,
                                    filter: styles.filter,
                                }}
                            >
                                <Dialog.Close className={close}>
                                    <X color="white" />
                                </Dialog.Close>
                                <Dialog.Title className={title}>
                                    Title Goes Here
                                </Dialog.Title>
                                <Dialog.Description className={description}>
                                    Description goes here.
                                </Dialog.Description>
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
