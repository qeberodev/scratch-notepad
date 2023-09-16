import { ComponentProps, PropsWithChildren, useCallback, useState } from "react"
import { Button } from "../ui/button/button"
import { container, inputBox } from "./search-bar.css"
import { Search, X } from "react-feather"
import { themeVars } from "../ui/styles.css"

export type SearchBarProps = {
    onClose?: () => void
    onChange?: ComponentProps<"input">["onChange"]
    value?: string
}
export function SearchBar(props: PropsWithChildren<SearchBarProps>) {
    const { onClose, onChange, value: entry } = props
    const [searchOpen, setSearchOpen] = useState(false)

    const handleClosing = useCallback(() => {
        onClose && onClose()
        setSearchOpen(false)
    }, [onClose])

    const onSearch = useCallback(() => {
        if (!searchOpen) {
            setSearchOpen(true)
            return
        }
        if (entry?.length === 0) handleClosing()
    }, [entry, handleClosing, searchOpen])

    return (
        <span className={container}>
            {searchOpen && (
                <span
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <input
                        value={entry}
                        onChange={onChange}
                        className={inputBox}
                        type="search"
                    />
                    <Button
                        style={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            margin: 0,
                            backgroundColor: `${themeVars.color.secondary}11`,
                        }}
                        onClick={handleClosing}
                    >
                        <X color={themeVars.color.secondary} />
                    </Button>
                </span>
            )}

            <Button onClick={onSearch}>
                <Search color={themeVars.color.secondary} />
            </Button>
        </span>
    )
}
