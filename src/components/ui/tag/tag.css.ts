import { style } from "@vanilla-extract/css"

export const container = style({
    cursor: "default",
    selectors: {
        "&[data-clickable='true']": {
            cursor: "pointer",
        },
    },
})
