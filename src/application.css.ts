import { style as s } from "@vanilla-extract/css"

const toggleBtn = s({
    position: "absolute",
    top: '10px',
    left: '10px',
    zIndex: 1
})

const container = s({
    minWidth: "100vw",
    minHeight: "100vh",

    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
})

export { container, toggleBtn }
