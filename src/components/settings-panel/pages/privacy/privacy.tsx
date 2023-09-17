import { Box } from "react-feather"
import { Button } from "../../../ui/button/button"
import { themeVars } from "../../../ui/styles.css"

export function Privacy() {
    return (
        <>
            <Button icon={<Box color={themeVars.color.secondary} />} />
        </>
    )
}
