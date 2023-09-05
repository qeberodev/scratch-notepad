import { CSSProperties, createTheme } from "@vanilla-extract/css"
import { Variant } from "./common"

export const backgroundBlur: CSSProperties = {
    backdropFilter: "blur(10px)",
}

export const COLOR: Record<Variant, string> = {
    primary: "#e7e7e7",
    secondary: "#262724",
    tertiary: "#ff6025",
}

type ThemeTokens = {
    color: Record<Variant, string>
    background: string
    fontFamily: string
}

export const [darkClass, darkVars] = createTheme<ThemeTokens>({
    color: {
        primary: "#f7f7f7",
        secondary: "#ff6025",
        tertiary: "#262724",
    },
    background: "#ffffff",
    fontFamily: "helvetica",
})

export const [lightClass, lightVars] = createTheme<ThemeTokens>({
    color: {
        primary: "#f7f7f7",
        secondary: "#ff6025",
        tertiary: "#262724",
    },
    background: "#ffffff",
    fontFamily: "helvetica",
})

export const Theme = {
    Light: lightVars,
    Dark: darkVars,
}
