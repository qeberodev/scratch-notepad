import { style } from "@vanilla-extract/css"
import { themeVars } from "../ui/styles.css"

export const container = style({
    display: "flex",
    flexDirection: "row",
    gap: 8,
    fontSize: "small",
})

export const tagOption = style({
    color: themeVars.color.secondary,
    cursor: "pointer",
    textTransform: "uppercase",
})
export const selected = style({
    color: themeVars.color.tertiary,
    fontWeight: "bold",
    borderBottom: `2px solid ${themeVars.color.tertiary}`,
    boxSizing: "border-box",
})
