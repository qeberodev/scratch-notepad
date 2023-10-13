import { Tag as TagModel } from "@app/model/note"
import { container } from "."
import { Tag as _Tag, TagProps as _TagProps } from "antd"
import { useEffect } from "react"

export type TagProps = Omit<_TagProps, "children"> & { tag: TagModel; clickable?: boolean }
export function Tag(props: TagProps) {
    const { tag, clickable, ...rest } = props

    useEffect(() => {
        if (!clickable && rest.onClick) throw new Error("Tag is not clickable, but onClick is provided")
    }, [])

    return (
        <_Tag data-clickable={clickable} className={container} {...rest}>
            {tag.id}
        </_Tag>
    )
}
