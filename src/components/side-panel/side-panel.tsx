import { animated, useTransition } from "@react-spring/web"
import { container, row, SIDE_PANEL_WIDTH } from "./side-panel.css"
import { X } from "react-feather"
import { Button } from "../ui/button/button"
import { PropsWithChildren } from "react"
import { animationConfig } from "../../animations"
import { themeVars } from "../ui/styles.css"
import * as Portal from "@radix-ui/react-portal"

export type SidePanelProps = {
    open?: boolean
    onClose?: (state: boolean) => void
    root?: HTMLElement | null
}
export function SidePanel(props: PropsWithChildren<SidePanelProps>) {
    const { open, root, onClose, children } = props

    const transitions = useTransition(open, {
        from: {
            x: SIDE_PANEL_WIDTH,
        },
        enter: {
            x: 0,
        },
        leave: {
            x: 0,
        },
        config: animationConfig,
    })

    return transitions((styles, items) =>
        items ? (
            <Portal.Root container={root} asChild>
                <animated.div style={styles} className={container}>
                    <section
                        className={row}
                        style={{ flexDirection: "row-reverse" }}
                    >
                        <Button
                            onClick={() => onClose && onClose(!open)}
                            style={{
                                borderRadius: "50%",
                                padding: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            title={"close side panel"}
                        >
                            <X color={themeVars.color.secondary} />
                        </Button>
                    </section>

                    <section>{children}</section>
                </animated.div>
            </Portal.Root>
        ) : null,
    )
}
