import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { persist } from "zustand/middleware"
import { APP_NAME } from "@app/constants"

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
            name: `${APP_NAME}-settings`,
        },
    ),
)
