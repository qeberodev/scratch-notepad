import { style as s } from "@vanilla-extract/css"
import { FONT } from "./components/ui/styles.css.ts"

const container = s({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    fontFamily: FONT.sanSerif,
    padding: "2rem",
})

const noteList = s({
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
})

export { container, noteList }
