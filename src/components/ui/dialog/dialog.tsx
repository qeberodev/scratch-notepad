import * as Dialog from "@radix-ui/react-dialog"
import { content, overlay } from "./dialog.css"
import { useTransition, animated, easings } from "@react-spring/web"
import { PropsWithChildren } from "react"

type DialogContainerProps = {
    open?: boolean
    onChange?: (open: boolean) => void
}
function DialogContainer(props: PropsWithChildren<DialogContainerProps>) {
    const { onChange, open } = props
    // const [open, setOpen] = useState(true)
    const transitions = useTransition(open, {
        from: {
            opacity: 0,
            containerOpacity: 1,
            containerScale: 0.3,
        },
        enter: {
            opacity: 1,
            containerOpacity: 1,
            containerScale: 1,
        },
        leave: {
            opacity: 0,
            containerOpacity: 0,
            containerScale: 0.6,
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
            {/* <Dialog.Trigger>Open Dialog</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay asChild>
                    <animated.div
                        className={overlay}
                        style={{
                            opacity,
                        }}
                    />
                </Dialog.Overlay>
                <Dialog.Content asChild>
                    <animated.div
                        className={content}
                        style={{
                            scale,
                        }}
                    >
                        <Dialog.Title className={title}>
                            Dialog Title
                        </Dialog.Title>
                        <Dialog.Description className={description}>
                            Lorem ipsum dialog box.
                        </Dialog.Description>
                        <Dialog.Close>Close</Dialog.Close>
                    </animated.div>
                </Dialog.Content>
            </Dialog.Portal> */}
            {transitions((styles, item) =>
                item ? (
                    <>
                        <Dialog.Overlay forceMount asChild>
                            <animated.div
                                className={overlay}
                                style={{
                                    opacity: styles.opacity,
                                }}
                            />
                        </Dialog.Overlay>
                        <Dialog.Content forceMount asChild>
                            <animated.div
                                className={content}
                                style={{
                                    scale: styles.containerScale,
                                    opacity: styles.containerOpacity,
                                }}
                            >
                                <Dialog.Close>close</Dialog.Close>
                                <h1 style={{ color: "black" }}>
                                    Hello from inside the Dialog!
                                </h1>
                            </animated.div>
                        </Dialog.Content>
                    </>
                ) : null,
            )}
        </Dialog.Root>
    )
}

export { DialogContainer }
