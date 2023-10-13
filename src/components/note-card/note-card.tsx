import { ContainerOutlined, DeleteOutlined, ExportOutlined, InboxOutlined } from "@ant-design/icons"
import { Tag as TagModel } from "@app/model/note"
import { Tag } from "@components/ui/tag"
import { Tooltip } from "@components/ui/tooltip"
import { Button, Card, Divider, Flex, Popconfirm, Space } from "antd"
import dayjs, { ConfigType } from "dayjs"
import { PropsWithChildren, useMemo, useState } from "react"
import { container, dateDisplay } from "."

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

export type NoteCardProps = Partial<ActionProps> & {
    date: ConfigType
    tags?: TagModel[]
}
export function NoteCard(props: PropsWithChildren<NoteCardProps>) {
    const { date, children, archived, tags, onArchive, onDelete, onOpen, onUndoArchive } = props

    return (
        <Card size="small" className={container}>
            <Flex vertical justify="space-between">
                <Flex gap={"small"} vertical>
                    {children}
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
                    <Flex wrap="nowrap" align="flex-end" justify="space-between">
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
