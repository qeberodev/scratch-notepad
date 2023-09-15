import { globalStyle, style as s } from "@vanilla-extract/css"
import { themeVars } from "../../ui/styles.css"

export const BUTTON_SIZE = 32
export const ICON_SIZE = BUTTON_SIZE - 16

const container = s({
    backgroundColor: "transparent",
    color: themeVars.color.secondary,
    borderRadius: "4px",
    border: "none",
    padding: 0,
    margin: 0,

    minWidth: `${BUTTON_SIZE}px`,
    minHeight: `${BUTTON_SIZE}px`,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    ":hover": {
        cursor: "pointer",
        backgroundColor: themeVars.background.secondary
    },
})
globalStyle(`${container} > svg`, {
    width: `${ICON_SIZE}px`,
    height: `${ICON_SIZE}px`,
    stroke: themeVars.color.secondary,
    strokeWidth: "3px",
})

export { container }
