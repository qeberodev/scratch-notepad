import { CSSProperties, createTheme } from "@vanilla-extract/css"
import { ColorVariant } from "./common"
import { Theme } from "../../model/settings"

export const backgroundBlur: CSSProperties = {
    backdropFilter: "blur(10px)",
}

type ThemeTokens = {
    color: Record<ColorVariant, string>
    background: Record<ColorVariant, string>
    fontFamily: string
}

export const [, themeVars] = createTheme<ThemeTokens>({
    background: {
        primary: "",
        secondary: "",
        tertiary: "",
    },
    color: {
        primary: "",
        secondary: "",
        tertiary: "",
    },
    fontFamily: "",
})

export const configs: Record<Theme, ThemeTokens> = {
    dark: {
        background: {
            primary: "#f7f7f733",
            tertiary: "#ff602533",
            secondary: "#3c41491f",
        },
        color: {
            primary: "#f7f7f7",
            secondary: "#3c4149",
            tertiary: "#ff6025",
        },
        fontFamily: "helvetica",
    },
    light: {
        color: {
            primary: "#f7f7f7",
            secondary: "#ff6025",
            tertiary: "#262724",
        },
        background: {
            primary: "#f7f7f733",
            secondary: "#ff602533",
            tertiary: "#26272433",
        },
        fontFamily: "helvetica",
    },
}

export const FONT = {
    sanSerif: "Nunito, sans-serif",
    serif: "DM Serif Display, serif",
}
