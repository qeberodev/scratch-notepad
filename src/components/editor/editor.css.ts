import { globalStyle, style as s } from "@vanilla-extract/css"
import { FONT, themeVars } from "../ui/styles.css"

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

const tag = s({
    borderRadius: 4,
    fontWeight: "light",
    padding: "0 4px",
    fontSize: "x-small",
    background: themeVars.background.tertiary,
    color: themeVars.color.secondary,
    whiteSpace: "nowrap",
})

const tagInput = s({
    border: "none",
    outline: "none",
    flex: 1,
    fontSize: "x-small",
})

const tagSectionContainer = s({
    flex: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "auto",

    // @ts-ignore does exist for IE scrollbar
    "-ms-overflow-style": "none",
    selectors: {
        "&::-webkit-scrollbar": {
            display: "none",
        },
    },
})

export { container, dialog, tag, tagInput, tagSectionContainer }
