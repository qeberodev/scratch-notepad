import { Button, Flex, theme } from "antd"
import { container } from "."
import { Tag as TagModel } from "@app/model/note"
import { ContainerOutlined, DeleteOutlined, SettingOutlined } from "@ant-design/icons"
import { Tag } from "@app/components/ui/tag"
import { Fragment, useCallback } from "react"
import { TagInput } from "@app/components/ui/tag/input"

type EditorActionsProps = {
    onArchive?: () => void
    onDelete?: () => void
    onOpenSettings?: () => void

    // TODO: implement undo/redo
    // onUndo: () => void
    // onRedo: () => void
}
function EditorActions(props: EditorActionsProps) {
    const { onArchive, onDelete, onOpenSettings } = props

    return (
        <Flex gap={"small"}>
            <Button danger type="text" onClick={onDelete} icon={<DeleteOutlined />} />
            <Button type="text" onClick={onArchive} icon={<ContainerOutlined />} />
            <Button type="text" onClick={onOpenSettings} icon={<SettingOutlined />} />
        </Flex>
    )
}

export type EditorHeaderProps = EditorActionsProps & {
    tags?: TagModel[]
    setTags?: (tags: TagModel[]) => void
}
export function EditorHeader(props: EditorHeaderProps) {
    const { tags, setTags, onArchive, onDelete, onOpenSettings } = props
    const { token } = theme.useToken()

    const styles: React.CSSProperties = {
        borderBottom: `1px solid ${token.colorBorder}`,
        flexDirection: "row-reverse",
        backgroundColor: token.colorBgBase,
    }

    const addTag = useCallback(
        (tag: TagModel) => {
            if (!setTags || !tags) return
            if (tags.find((t) => t.id === tag.id)) return
            setTags([...tags, tag])
        },
        [tags, setTags],
    )

    const handleTagClose = useCallback(
        (tag: TagModel) => {
            if (!setTags || !tags) return
            setTags(tags.filter((t) => t.id !== tag.id))
        },
        [tags, setTags],
    )

    return (
        <Flex style={styles} justify="space-between" align="center" className={container}>
            <EditorActions onArchive={onArchive} onDelete={onDelete} onOpenSettings={onOpenSettings} />
            <Flex flex={1}>
                <Fragment>
                    {tags?.map((tag) => <Tag closable onClose={() => handleTagClose(tag)} tag={tag} key={tag.id} />)}
                </Fragment>
                <TagInput onConfirm={addTag} />
            </Flex>
        </Flex>
    )
}
