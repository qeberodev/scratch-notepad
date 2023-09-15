import { assignInlineVars } from "@vanilla-extract/dynamic"
import { themeVars, configs } from "../components/ui/styles.css"
import { useMemo } from "react"
import { useSettings } from "../model/settings"

export function useTheme() {
    const { theme } = useSettings()
    const vars = useMemo(() => {
        const config = configs[theme]
        return assignInlineVars(themeVars, config)
    }, [theme])

    return {
        vars,
    }
}
