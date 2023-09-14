import { style as s } from "@vanilla-extract/css"
import { COLOR } from "../ui/styles.css"

export const container = s({
    position: "relative",
})

export const counter = s({
    width: '1em',
    height: '1em',
    color: COLOR.primary,
    backgroundColor: COLOR.tertiary,
    fontSize: 'x-small',
    borderRadius: '50%',
    boxSizing: "content-box",
    padding: '.1em',

    position: "absolute",
    bottom: 0,
    right: 0,
    transform: "translate(-40%, -40%)",
})
