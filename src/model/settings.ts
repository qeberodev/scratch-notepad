import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

const _themes = ["dark", "light"] as const
export type Theme = (typeof _themes)[number]
type State = {
    theme: Theme
}
type Action = {
    setTheme: (theme: Theme) => void
}

export const useSettings = create(
    persist(
        immer<State & Action>((set) => {
            const isDark = matchMedia("(prefers-color-scheme: dark)").matches
            const theme: Theme = isDark ? "dark" : "light"

            return {
                theme,
                setTheme: (t) => {
                    set((state) => {
                        state.theme = t
                    })
                },
            }
        }),
        {
            name: "scratch-settings",
        },
    ),
)
