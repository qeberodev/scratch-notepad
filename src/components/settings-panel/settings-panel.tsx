import { PropsWithChildren, ReactNode, useCallback, useMemo } from "react"
import { ArrowLeft, Home, Info, Lock, Settings } from "react-feather"
import { nav } from "."
import { toUpper } from "../../utils"
import { Button } from "../ui/button/button"
import { themeVars } from "../ui/styles.css"
import { GeneralPage, HomePage } from "./pages"
import { Privacy } from "./pages/privacy"
import { useNotes } from "../../model/note"

export const pages = ["home", "general", "privacy", "about"] as const
export type Page = (typeof pages)[number]

type SettingsPanelProps = {
    page?: Page
    onChange: (page: Page) => void
}
export const pagesList: Record<Page, { title: string; icon: ReactNode }> = {
    about: {
        title: "About",
        icon: <Info color={themeVars.color.secondary} />,
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

export function GoHome(
    props: PropsWithChildren<SettingsPageProps & { title: string }>,
) {
    const { onChange, title } = props

    return (
        <Button
            className={nav}
            data-elevated
            onClick={() => onChange("home")}
            icon={<ArrowLeft color={themeVars.color.secondary} />}
        >
            {title}
        </Button>
    )
}

export type SettingsPageProps = { onChange: (page: Page) => void }

export function SettingsPanel(props: PropsWithChildren<SettingsPanelProps>) {
    const [clearData] = useNotes((state) => [state.clearData])
    const { page, onChange } = props
    const CurrentPage = useMemo(() => {
        switch (page) {
            case "home": {
                return HomePage
            }
            case "general": {
                return GeneralPage
            }
            case "privacy": {
                return () => <Privacy onClearData={clearData} />
            }
            default: {
                return () => null
            }
        }
    }, [clearData, page])

    const handleChangePage = useCallback((id: Page) => onChange(id), [onChange])

    return (
        <>
            {page && page !== "home" && (
                <div>
                    <GoHome title={toUpper(page)} onChange={handleChangePage} />
                    <br />
                </div>
            )}

            <CurrentPage onChange={handleChangePage} />
        </>
    )
}
