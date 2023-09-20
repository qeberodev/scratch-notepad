import { style as s } from "@vanilla-extract/css"
import { themeVars } from "../../../ui/styles.css"

export const item = s({
    height: 48,
    width: "100%",
    border: "none",
    borderRadius: "4px",
    display: "inline-block",
    backgroundColor: themeVars.background.secondary,

    fontWeight: "bold",
    fontSize: "medium",
    cursor: "pointer",

    selectors: {
        "&[data-state=checked]": {
            border: `2px solid ${themeVars.color.tertiary}`,
        },
    },
})

export const root = s({
    display: "flex",
    flexDirection: "column",
    gap: 4,
})

export const label = s({})
