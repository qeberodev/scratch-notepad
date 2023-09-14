import { globalStyle, style as s } from "@vanilla-extract/css"
import { ICON_SIZE } from "../side-panel"

export const nav = s({
    gap: 8,
    padding: "8px 16px",
    fontSize: "large",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
})
globalStyle(`${nav} > svg`, {
    width: ICON_SIZE,
    height: ICON_SIZE,
    strokeWidth: 2,
})
