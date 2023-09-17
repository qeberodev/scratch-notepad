import { PropsWithChildren } from "react"
import { tag as tagClassName } from "./tag.css"
import { Tag } from "../../model/note"

export function Tag(props: PropsWithChildren<{ tag: Tag }>) {
    const { tag } = props

    return <span className={tagClassName}>{tag.id}</span>
}
