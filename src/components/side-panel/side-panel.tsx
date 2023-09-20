import { animated, useTransition } from "@react-spring/web"
import { container, row, SIDE_PANEL_WIDTH } from "./side-panel.css"
import { X } from "react-feather"
import { Button } from "../ui/button/button"
import { PropsWithChildren } from "react"
import { animationConfig } from "../../animations"
import { themeVars } from "../ui/styles.css"

export type SidePanelProps = {
    open?: boolean
    onClose?: (state: boolean) => void
}
export function SidePanel(props: PropsWithChildren<SidePanelProps>) {
    const { open, onClose, children } = props

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
        ) : null,
    )
}
