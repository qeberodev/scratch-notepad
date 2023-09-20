import { PropsWithChildren } from "react"
import { tag as tagClassName } from "./tag.css"
import { Tag as TagType } from "../../model/note"

export function Tag(props: PropsWithChildren<{ tag: TagType }>) {
    const { tag } = props

    return <span className={tagClassName}>{tag.id}</span>
}
