import { style as s } from "@vanilla-extract/css"

const toggleBtn = s({
    position: "absolute",
    top: '10px',
    left: '10px',
    zIndex: 1
})

const container = s({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
})

export { container, toggleBtn }
