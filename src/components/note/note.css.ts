import { globalStyle, style as s } from "@vanilla-extract/css"
import { COLOR, FONT } from "../ui/styles.css"

export const container = s({
    background: COLOR.primary,
    color: COLOR.secondary,
    padding: ".5em",
    width: "18em",
    minHeight: "3em",
    borderRadius: 4,
    fontFamily: "DM Serif Display, serif",
})

export const block = s({})
globalStyle(`${block}[data-type="paragraph"]`, {
    fontSize: "small",
    fontFamily: FONT.sanSerif
})
globalStyle(`${block}[data-type="header"]`, {
    fontSize: "large",
    fontWeight: "bold"
})

export const blocksContainer = s({
    display: 'flex',
    flexDirection: "column",
    gap: ".5em"
})