import { Archive } from "react-feather"
import { Button } from "../ui/button/button"
import { themeVars } from "../ui/styles.css"
import { container, counter } from "./archived-button.css"
import { PropsWithChildren } from "react"

export function ArchivedButton(props: PropsWithChildren<{ count: number }>) {
    const { count } = props

    return (
        <Button
            className={container}
            icon={<Archive color={themeVars.color.secondary} />}
        >
            <span className={counter}>{count}</span>
        </Button>
    )
}