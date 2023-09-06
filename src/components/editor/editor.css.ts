import { style as s } from "@vanilla-extract/css"

const MIN_MOBILE_WIDTH = 768
const container = s({
    margin: "0 auto",
    width: "90%",
    "@media": {
        [`screen and (min-width: ${MIN_MOBILE_WIDTH}px)`]: {},
    },
})

const dialog = s({
    "@media": {
        [`screen and (max-width: ${MIN_MOBILE_WIDTH}px)`]: {
            width: "95%",
        },
    },
})
export { container, dialog }
