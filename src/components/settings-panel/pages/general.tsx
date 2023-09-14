import { GoHome } from "./home.tsx"
import { PropsWithChildren, useMemo } from "react"
import { pagesList, SettingsPageProps } from "../settings-panel"

export function GeneralPage(props: PropsWithChildren<SettingsPageProps>) {
    const { onChange } = props
    const pageInfo = useMemo(() => pagesList["general"], [])

    return (
        <>
            <GoHome onChange={onChange} title={pageInfo.title} />
        </>
    )
}
