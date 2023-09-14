import { globalStyle } from "@vanilla-extract/css"
import { FONT } from "./components/ui/styles.css.ts"

globalStyle("html, body", {
    margin: 0,
    fontFamily: FONT.sanSerif,
})
