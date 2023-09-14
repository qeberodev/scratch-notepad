import { pages, pagesList, SettingsPageProps } from "../settings-panel"
import { Button } from "../../ui/button/button.tsx"
import { nav } from "../settings-panel.css"
import { PropsWithChildren } from "react"
import { ArrowLeft } from "react-feather"
import { COLOR } from "../../ui/styles.css.ts"

export function GoHome(
    props: PropsWithChildren<SettingsPageProps & { title: string }>,
) {
    const { onChange, title } = props

    return (
        <Button
            className={nav}
            onClick={() => onChange("home")}
            icon={<ArrowLeft color={COLOR.secondary} />}
        >
            {title}
        </Button>
    )
}

export function HomePage(props: PropsWithChildren<SettingsPageProps>) {
    const { onChange } = props

    return (
        <section
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
            }}
        >
            {pages
                .filter((id) => id !== "home")
                .map((pageId) => {
                    const pageInfo = pagesList[pageId]

                    return (
                        <Button
                            className={nav}
                            key={`${pageId}-option`}
                            onClick={() => onChange(pageId)}
                            icon={pageInfo.icon}
                        >
                            {pageInfo.title}
                        </Button>
                    )
                })}
        </section>
    )
}
