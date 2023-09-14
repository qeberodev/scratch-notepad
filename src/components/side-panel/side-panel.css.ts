import { globalStyle, style as s } from "@vanilla-extract/css"
import { COLOR } from "../ui/styles.css"

export const SIDE_PANEL_WIDTH = 430
const container = s({
    height: "100%",
    width: `${SIDE_PANEL_WIDTH}px`,
    background: COLOR.primary,
    zIndex: 2,
    position: "absolute",
    right: 0,
    top: 0,
    borderLeft: `3px solid ${COLOR.secondary}33`,

    // layout
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "8px",
    boxSizing: "border-box",
})

const row = s({
    display: "flex",
    flexDirection: "row"
})

export const BUTTON_SIZE = 32
export const ICON_SIZE = BUTTON_SIZE - 8
const closeBtn = s({
    height: `${BUTTON_SIZE}px`,
    width: `${BUTTON_SIZE}px`,
    boxSizing: "border-box",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
})
globalStyle(`${closeBtn} > svg`, {
    width: `${ICON_SIZE}px`,
    height: `${ICON_SIZE}px`,
})

export { container, row, closeBtn }
