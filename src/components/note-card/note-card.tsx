import { ContainerOutlined, DeleteOutlined, ExportOutlined, InboxOutlined } from "@ant-design/icons"
import { Note, Tag as TagModel } from "@app/model/note"
import { Tag } from "@components/ui/tag"
import { Tooltip } from "@components/ui/tooltip"
import { OutputBlockData } from "@editorjs/editorjs"
import { Button, Card, Divider, Flex, Popconfirm, Space } from "antd"
import dayjs, { ConfigType } from "dayjs"
import { PropsWithChildren, useCallback, useMemo, useState, Fragment } from "react"
import { container, dateDisplay } from "."
import { Tool } from "@app/hooks/use-editor"

export function DateDisplay(props: { date: ConfigType }) {
    const date = useMemo(() => dayjs(props.date), [props.date])
    const formatted = useMemo(() => date.format("MMM DD, YYYY"), [date])

    return <span className={dateDisplay}>{formatted}</span>
}

function DeleteConfirmBtn(props: { onClick?: () => void }) {
    const [showingTip, showTip] = useState(false)

    return (
        <Popconfirm
            okText={"Yes"}
            cancelText={"No"}
            okType={"danger"}
            onConfirm={props.onClick}
            cancelButtonProps={{ type: "text" }}
            title={"Are you sure you want to delete this note?"}
            icon={null}
            onOpenChange={(open) => showTip(!open)}
        >
            <Tooltip title="Delete Note" open={showingTip}>
                <Button
                    onMouseEnter={() => showTip(true)}
                    onMouseLeave={() => showTip(false)}
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    title={"Delete Note"}
                />
            </Tooltip>
        </Popconfirm>
    )
}

type ActionProps = {
    onArchive: () => void
    onUndoArchive: () => void
    onOpen: () => void
    onDelete: () => void
    archived: boolean | null
}
export function Actions(props: Partial<ActionProps>) {
    return (
        <Space>
            <Tooltip title="Open Note">
                <Button type="text" size="small" icon={<ExportOutlined />} title={"Open Note"} onClick={props.onOpen} />
            </Tooltip>
            {!props.archived ? (
                <Tooltip title="Archive Note">
                    <Button
                        type="text"
                        size="small"
                        icon={<ContainerOutlined />}
                        title={"Archive Note"}
                        onClick={props.onArchive}
                    />
                </Tooltip>
            ) : (
                <Tooltip title="Undo Archiving Note">
                    <Button
                        type="text"
                        size="small"
                        icon={<InboxOutlined />}
                        title={"Undo Archiving Note"}
                        onClick={props.onUndoArchive}
                    />
                </Tooltip>
            )}
            <DeleteConfirmBtn onClick={props.onDelete} />
        </Space>
    )
}

function NoteContent({ note }: Pick<Required<NoteCardProps>, "note">) {
    const renderBlock = useCallback(
        ({ type, data, id }: OutputBlockData<string, any>) => {
            switch (type as Tool) {
                case "header": {
                    return (
                        <h3 style={{ margin: 0 }} key={id}>
                            {data.text}
                        </h3>
                    )
                }
                case "list": {
                    const items = data.items as { content: string; items: any }[]
                    const style = data.style as "ordered" | "unordered"
                    if (style === "ordered") {
                        return (
                            <ul key={id}>
                                {items.map((item) => (
                                    <li>{item.content}</li>
                                ))}
                            </ul>
                        )
                    } else {
                        return (
                            <ol key={id}>
                                {items
                                    .filter((item) => item.content !== "")
                                    .map((item) => (
                                        <li>{item.content}</li>
                                    ))}
                            </ol>
                        )
                    }
                }
                // Default Tool in EditorJS
                case "paragraph":
                default: {
                    return (
                        <p style={{ padding: 0, margin: 0 }} key={id}>
                            {data.text}
                        </p>
                    )
                }
            }
        },
        [note],
    )

    return <Fragment>{note.blocks.filter((_, idx) => idx < 2).map((b) => renderBlock(b))}</Fragment>
}

export type NoteCardProps = Partial<ActionProps> & {
    date: ConfigType
    tags?: TagModel[]
    note?: Note
}
export function NoteCard(props: PropsWithChildren<NoteCardProps>) {
    const { date, note, children, archived, tags, onArchive, onDelete, onOpen, onUndoArchive } = props

    return (
        <Card hoverable size="small" className={container}>
            <Flex vertical justify="space-between">
                <Flex gap={"small"} vertical>
                    {note ? <NoteContent note={note} /> : children}
                </Flex>

                <Flex vertical gap={"small"} style={{ marginTop: "32px" }}>
                    {/* Tags */}
                    {tags && (
                        <Flex gap={1}>
                            {tags.map((tag) => (
                                <Tag tag={tag} />
                            ))}
                        </Flex>
                    )}

                    {/* --- */}
                    <Divider style={{ margin: "0" }} dashed />
                    <Flex
                        wrap="nowrap"
                        align="flex-end"
                        justify="space-between"
                        onClick={(e) => {
                            if (e.currentTarget === e.target) {
                                onOpen && onOpen()
                            }
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        <DateDisplay date={date} />
                        <Actions
                            archived={archived}
                            onArchive={onArchive}
                            onDelete={onDelete}
                            onOpen={onOpen}
                            onUndoArchive={onUndoArchive}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}
