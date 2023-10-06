import { PropsWithChildren, useCallback, useMemo } from "react"
import { container, selected, tagOption } from "."
import { AvailableTag, DefaultTag, Tag } from "../../model/note"
import clsx from "clsx"

export type TagOptionProps = {
    isSelected: boolean
    tag: Tag
    onClick?: (tag: Tag) => void
}
export function TagOption(props: TagOptionProps) {
    const { isSelected, tag, onClick } = props

    return (
        <span
            onClick={() => {
                onClick && onClick(tag)
            }}
            className={clsx(isSelected && selected, tagOption)}
        >
            {tag.id}
        </span>
    )
}

type TagSelectListProps = {
    tags: Tag[]
    selectedTag: AvailableTag
    onTagChange?: (tagId: string) => void
    root?: HTMLElement | null
}
export function TagSelectList(props: PropsWithChildren<TagSelectListProps>) {
    const { tags, selectedTag, onTagChange } = props
    const isSelected = useCallback(
        (thisTag: AvailableTag) => selectedTag === thisTag,
        [selectedTag],
    )
    const onTagClick = useCallback(
        (tag: Tag) => onTagChange && onTagChange(tag.id),
        [],
    )

    const defaultTags = useMemo(
        () => (["home", "archived"] as DefaultTag[]).map((t) => new Tag(t)),
        [],
    )

    return (
        <span className={container}>
            {defaultTags.map((tag) => (
                <TagOption
                    key={tag.id}
                    tag={tag}
                    onClick={onTagClick}
                    isSelected={isSelected(tag.id)}
                />
            ))}

            {tags.map((tag) => (
                <TagOption
                    tag={tag}
                    key={tag.id}
                    onClick={onTagClick}
                    isSelected={isSelected(tag.id)}
                />
            ))}
        </span>
    )
}
