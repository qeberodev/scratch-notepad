import { animated, useSpring } from "@react-spring/web"
import { container, row, SIDE_PANEL_WIDTH, closeBtn } from "./side-panel.css"
import { X } from "react-feather"
import { PropsWithChildren } from "react"

function CloseBtn(props: PropsWithChildren<{ onClick: () => void }>) {
    return (
        <animated.button
            onClick={props.onClick}
            className={closeBtn}
            title={"close side panel"}
            type={"button"}
        >
            <X color="white" />
        </animated.button>
    )
}

export type SidePanelProps = {
    open?: boolean
    onClose?: (state: boolean) => void
}
export function SidePanel(props: React.PropsWithChildren<SidePanelProps>) {
    const { open, onClose } = props
    const springs = useSpring({
        x: open ? 0 : -1 * SIDE_PANEL_WIDTH,
    })

    return (
        <animated.div style={springs} className={container}>
            <section className={row} style={{ flexDirection: "row-reverse" }}>
                <CloseBtn onClick={() => onClose && onClose(!open)} />
            </section>
        </animated.div>
    )
}
