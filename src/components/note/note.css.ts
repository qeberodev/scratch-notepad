import { style as s } from "@vanilla-extract/css"
import { COLOR } from "../ui/styles.css"

export const container = s({
    background: COLOR.primary,
    color: COLOR.secondary,
    padding: ".5em",
    width: "18em",
    minHeight: "3em",
    borderRadius: 4,
    fontFamily: "DM Serif Display, serif",
})
