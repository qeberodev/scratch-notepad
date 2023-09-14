import { style as s } from "@vanilla-extract/css"
import { COLOR } from "../ui/styles.css"
import { BUTTON_SIZE } from "../ui/button/button.css"

export const container = s({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4
})

export const inputBox = s({
    background: `${COLOR.secondary}11`,
    border: "none",
    borderRadius: 4,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    height: BUTTON_SIZE,
    minWidth: `15rem`,
    boxSizing: "border-box",
    paddingLeft: "1em",

    ":focus-visible": {
        outline: "none",
    },
    "::-ms-reveal": {
        display: "none",
    },
    "::-ms-clear": { display: "none" },
})
