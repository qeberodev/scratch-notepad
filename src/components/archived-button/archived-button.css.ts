import { style as s } from "@vanilla-extract/css"
import { themeVars } from "../ui/styles.css"

export const container = s({
    position: "relative",
})

export const counter = s({
    width: "1em",
    height: "1em",
    color: themeVars.color.primary,
    backgroundColor: themeVars.color.tertiary,
    fontSize: "x-small",
    borderRadius: "50%",
    boxSizing: "content-box",
    padding: ".1em",

    position: "absolute",
    bottom: 0,
    right: 0,
    transform: "translate(-40%, -40%)",

    selectors: {
        "&[data-empty=true]": {
            backgroundColor: themeVars.color.secondary,
        },
    },
})
