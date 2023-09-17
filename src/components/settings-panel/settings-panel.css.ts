import { globalStyle, style as s } from "@vanilla-extract/css"
import { ICON_SIZE } from "../side-panel"
import { themeVars } from "../ui/styles.css"

export const nav = s({
    gap: 8,
    padding: "8px 16px",
    fontSize: "large",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    border: "1px solid transparent",

    selectors: {
        "&[data-elevated=true]": {
            boxShadow: `0 0 1px 1px ${themeVars.background.secondary}`,
        },
        "&[data-elevated=true]:hover": {
            border: `1px solid ${themeVars.background.secondary}`,
        },
    },
})
globalStyle(`${nav} > svg`, {
    width: ICON_SIZE,
    height: ICON_SIZE,
    strokeWidth: 2,
})
