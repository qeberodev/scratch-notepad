import { style as s } from "@vanilla-extract/css"
import { FONT, themeVars } from "../ui/styles.css"

export const tag = s({
    borderRadius: 4,
    padding: "0 4px",
    fontWeight: "bold",
    fontSize: "x-small",
    fontFamily: FONT.sanSerif,
    background: themeVars.background.tertiary,
    color: themeVars.color.secondary,
})
