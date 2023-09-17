import { Lock, XOctagon } from "react-feather"
import { Button } from "../../../ui/button/button"
import { themeVars } from "../../../ui/styles.css"
import { useCallback, useMemo, useRef, useState } from "react"

const CLEAR_TIMEOUT = 4 * 1000
export function Privacy() {
    const [confirmClear, isConfirm] = useState(false)
    const clearConfirmTimeout = useRef<NodeJS.Timeout>()

    const confirmButtonVariant = useMemo(() => {
        if (confirmClear) {
            return {
                icon: <XOctagon color={themeVars.color.tertiary} />,
                text: "Confirm Clearing Data",
                color: themeVars.color.tertiary,
            }
        }

        return {
            icon: <Lock color={themeVars.color.secondary} />,
            text: "Clear Data",
            color: themeVars.color.secondary,
        }
    }, [confirmClear])

    const handleClear = useCallback(() => {
        if (confirmClear) {
            //TODO - Clearing User Data
            console.log("Clearing User Data")

            isConfirm(false)
            clearConfirmTimeout.current &&
                clearTimeout(clearConfirmTimeout.current)
            return
        }

        clearConfirmTimeout.current = setTimeout(() => {
            isConfirm(false)
        }, CLEAR_TIMEOUT)
        isConfirm(true)
    }, [confirmClear])

    return (
        <>
            <section>
                We respect your right to privacy and give you the ability to
                control your data. Our Data Clear functionality allows you to:
                <ul>
                    <li>
                        <b>Clear Personal Data: </b> Remove all personal data,
                        including profile information, preferences, and account
                        settings.
                    </li>

                    <li>
                        <b>Delete User Content:</b> Erase all user-generated
                        content such as notes, scratch boards, and uploaded
                        files.
                    </li>
                </ul>
                <Button
                    onClick={handleClear}
                    icon={confirmButtonVariant.icon}
                    style={{
                        color: confirmButtonVariant.color,
                    }}
                >
                    {confirmButtonVariant.text}
                </Button>
            </section>
        </>
    )
}
