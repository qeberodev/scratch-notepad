import { Archive } from "react-feather"
import { Button } from "../ui/button/button"
import { themeVars } from "../ui/styles.css"
import { container, counter } from "./archived-button.css"
import { ComponentProps, PropsWithChildren } from "react"

export function ArchivedButton(
    props: PropsWithChildren<{
        count: number
        onClick?: ComponentProps<"button">["onClick"]
    }>,
) {
    const { count, onClick } = props

    return (
        <Button
            onClick={onClick}
            className={container}
            icon={<Archive color={themeVars.color.secondary} />}
        >
            <span data-empty={count === 0} className={counter}>
                {count}
            </span>
        </Button>
    )
}
