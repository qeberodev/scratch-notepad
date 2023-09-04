import { style as s } from "@vanilla-extract/css"
import { LAYER_LEVEL } from "../common"

const overlay = s({
    backgroundColor: "#0006",
    position: "fixed",
    inset: 0,
    zIndex: LAYER_LEVEL.LEVEL_2,
    backdropFilter: "blur(3px)",
})

const content = s({
    textAlign: "left",
    backgroundColor: "white",
    borderRadius: "6px",
    boxShadow:
        "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
    position: "fixed",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    maxWidth: "450px",
    maxHeight: "85vh",
    padding: "25px",
    ":focus": {
        outline: "none",
    },
    zIndex: LAYER_LEVEL.LEVEL_3,
})

const title = s({
    margin: 0,
    fontWeight: 500,
    color: "black",
    fontSize: "17px",
})

const description = s({
    margin: "10px 0 20px",
    color: "black",
    fontSize: "15px",
    lineHeight: "1.5",
})

const close = s({
    marginLeft: "auto",
    display: "flex",
    padding: "2px",
    borderRadius: "50%",
})

export { description, overlay, title, content, close }
