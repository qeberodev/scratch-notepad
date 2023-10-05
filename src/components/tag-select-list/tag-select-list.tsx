import { PropsWithChildren, useCallback } from "react"
import { container, selected, tagOption } from "."
import { Tag } from "../../model/note"
import clsx from "clsx"

const _defaultTags = ["home", "archived"] as const
type DefaultTags = (typeof _defaultTags)[number]

export type TagSelectionProps = {
    isSelected: boolean
    tag: Tag
}
export function TagOption(props: TagSelectionProps) {
    const {
        isSelected,
        tag: { id },
    } = props

    return <span className={clsx(isSelected && selected, tagOption)}>{id}</span>
}

type AvailableTagOptions = DefaultTags | (string & {})
type TagSelectListProps = {
    tags: Tag[]
    selectedTag: AvailableTagOptions
}
export function TagSelectList(props: PropsWithChildren<TagSelectListProps>) {
    const { tags, selectedTag } = props
    const isSelected = useCallback(
        (thisTag: AvailableTagOptions) => selectedTag === thisTag,
        [selectedTag],
    )

    return (
        <span className={container}>
            <TagOption tag={{ id: "home" }} isSelected={true} />
            <TagOption
                tag={{ id: "archived" }}
                isSelected={isSelected("archived")}
            />

            {tags.map((tag) => (
                <span>{tag.id}</span>
            ))}
        </span>
    )
}
