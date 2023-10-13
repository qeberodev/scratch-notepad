import { MainHeader, MainHeaderProps } from "@app/components/main-header"
import { Tag as TagModel } from "@app/model/note"
import { useState } from "react"

export function Header(props: MainHeaderProps) {
    const [search, setSearch] = useState("")
    const handleSearch = (value: string) => console.log("searching: ", { value })
    const handleNew = () => console.log("New Clicked!")
    const handleTagSelect = (tag: TagModel) => console.log("tag selected: ", { tag })

    return (
        <MainHeader
            onSearch={handleSearch}
            onNew={handleNew}
            onChange={setSearch}
            value={search}
            onTagSelect={handleTagSelect}
            {...props}
        />
    )
}
