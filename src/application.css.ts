import { style as s } from "@vanilla-extract/css";

const square = s({
    height: "100px",
    width: "100px",
    backgroundColor: "red",
})

const container = s({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
})

export {
    container,
    square
}