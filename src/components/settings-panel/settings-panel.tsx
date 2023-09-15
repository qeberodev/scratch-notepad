import { PropsWithChildren, ReactNode, useCallback, useMemo } from "react"
import { Home, Info, Lock, Settings } from "react-feather"
import { themeVars } from "../ui/styles.css"
import { HomePage, GeneralPage } from "./pages"

export const pages = ["home", "general", "privacy", "about"] as const
export type Page = (typeof pages)[number]

type SettingsPanelProps = {
    page?: Page
    onChange: (page: Page) => void
}
export const pagesList: Record<Page, { title: string; icon: ReactNode }> = {
    about: {
        title: "About",
        icon: <Info color={themeVars.color.primary} />,
    },
    general: {
        title: "General",
        icon: <Settings color={themeVars.color.secondary} />,
    },
    privacy: {
        title: "Privacy",
        icon: <Lock color={themeVars.color.secondary} />,
    },
    home: {
        title: "Home",
        icon: <Home color={themeVars.color.secondary} />,
    },
}

export type SettingsPageProps = { onChange: (page: Page) => void }

export function SettingsPanel(props: PropsWithChildren<SettingsPanelProps>) {
    const { page, onChange } = props
    const CurrentPage = useMemo(() => {
        switch (page) {
            case "home": {
                return HomePage
            }
            case "general": {
                return GeneralPage
            }
            default: {
                return () => null
            }
        }
    }, [page])

    const handleChangePage = useCallback((id: Page) => onChange(id), [])

    return (
        <>
            <CurrentPage onChange={handleChangePage} />
        </>
    )
}
