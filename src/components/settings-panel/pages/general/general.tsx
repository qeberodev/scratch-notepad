import * as RadioGroup from "@radix-ui/react-radio-group"
import { useCallback } from "react"
import { Theme, useSettings } from "../../../../model/settings.ts"
import { item, label, root } from "./general.css"

type ThemeOptionProps = {
    title: string
    value: Theme
}
export const ThemeOption = (
    props: RadioGroup.RadioGroupItemProps & ThemeOptionProps,
) => {
    const { title, value, id, ...rest } = props

    return (
        <RadioGroup.Item className={item} value={value} id={id} {...rest}>
            <label className={label} htmlFor="r1">
                {title}
            </label>
        </RadioGroup.Item>
    )
}
export function GeneralPage() {
    const { theme, setTheme } = useSettings()
    const handleThemeChange = useCallback(
        (selected: Theme) => {
            if (theme != selected) setTheme(selected)
        },
        [setTheme, theme],
    )

    return (
        <section>
            <RadioGroup.Root
                className={root}
                defaultValue={theme}
                aria-label="View density"
                onValueChange={handleThemeChange}
            >
                <ThemeOption title="Dark" value="dark" />
                <ThemeOption title="Light" value="light" />
            </RadioGroup.Root>
        </section>
    )
}
