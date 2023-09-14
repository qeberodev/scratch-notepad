import { animated, useSpring } from "@react-spring/web"
import { container, row, SIDE_PANEL_WIDTH } from "./side-panel.css"
import { X } from "react-feather"
import { Button } from "../ui/button/button"
import { PropsWithChildren } from "react"
import { animationConfig } from "../../animations"

export type SidePanelProps = {
    open?: boolean
    onClose?: (state: boolean) => void
}
export function SidePanel(props: PropsWithChildren<SidePanelProps>) {
    const { open, onClose, children } = props
    const springs = useSpring({
        x: open ? 0 : SIDE_PANEL_WIDTH,
        config: animationConfig,
    })

    return (
        <animated.div style={springs} className={container}>
            <section className={row} style={{ flexDirection: "row-reverse" }}>
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
                    <X color="white" />
                </Button>
            </section>

            <section>{children}</section>
        </animated.div>
    )
}
