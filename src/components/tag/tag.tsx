import { PropsWithChildren } from "react"
import { container } from "./tag.css"
import { Tag as TagType } from "../../model/note"

export function Tag(props: PropsWithChildren<{ tag: TagType }>) {
    const { tag } = props

    return <span className={container}>{tag.id}</span>
}
