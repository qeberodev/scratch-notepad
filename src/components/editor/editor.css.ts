import { globalStyle, style as s } from "@vanilla-extract/css"
import { FONT } from "../ui/styles.css"

const MIN_MOBILE_WIDTH = 768
const container = s({
    margin: "0 auto",
    width: "90%",
    fontFamily: FONT.sanSerif,
    "@media": {
        [`screen and (min-width: ${MIN_MOBILE_WIDTH}px)`]: {},
    },
})
globalStyle(`${container} .ce-block`, {
    fontFamily: FONT.serif,
})

const dialog = s({
    "@media": {
        [`screen and (max-width: ${MIN_MOBILE_WIDTH}px)`]: {
            width: "95%",
        },
    },
})

export { container, dialog }
