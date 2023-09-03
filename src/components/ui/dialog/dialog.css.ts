import { style as s } from "@vanilla-extract/css"
import { LAYER_LEVEL } from "../common"

const container = s({})

const overlay = s({
    backgroundColor: "gray",
    position: "fixed",
    inset: 0,
    zIndex: LAYER_LEVEL.LEVEL_2,
})

const content = s({
    backgroundColor: "white",
    borderRadius: "6px",
    boxShadow:
        "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
    position: "fixed",
    // top: "50%",
    // left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    maxWidth: "450px",
    maxHeight: "85vh",
    padding: "25px",
    ":focus": {
        outline: "none",
    },
    zIndex: LAYER_LEVEL.LEVEL_3
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

export { container, description, overlay, title, content }
