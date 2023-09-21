import { style as s } from "@vanilla-extract/css"
import { FONT, themeVars } from "../ui/styles.css"
import { LAYER_LEVEL } from "../ui/common"

export const container = s({
    fontSize: "medium",
    fontFamily: FONT.sanSerif,

    margin: 8,
    minWidth: 100,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: themeVars.color.secondary,
    backgroundColor: themeVars.color.primary,
    borderRadius: 4,
    boxShadow: `0 0 1px 1px ${themeVars.background.secondary}`,
    zIndex: LAYER_LEVEL.LEVEL_2,
})
