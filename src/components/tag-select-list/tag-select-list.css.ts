import { style } from "@vanilla-extract/css"
import { themeVars } from "../ui/styles.css"

export const container = style({
    display: "flex",
    flexDirection: "row",
    gap: 8,
    overflow: "auto",
    alignItems: "center",
    maxWidth: "30%",
})

export const tagOption = style({
    color: themeVars.color.secondary,
    cursor: "pointer",
    textTransform: "uppercase",
    userSelect: "none",
    fontSize: "9px",
})
export const selected = style({
    color: themeVars.color.tertiary,
    opacity: "100%",
    fontWeight: "bold",
    fontSize: "12px",
    borderBottom: `2px solid ${themeVars.color.tertiary}`,
    boxSizing: "border-box",
})
