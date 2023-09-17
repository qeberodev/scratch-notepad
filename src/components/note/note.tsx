import { PropsWithChildren, ReactNode, useCallback, useMemo } from "react"
import { container, block as blockStyle, blocksContainer } from "./note.css"
import { Button } from "../ui/button/button"
import { Maximize2, Trash, Archive } from "react-feather"
import type { Note } from "../../model/note"
import { themeVars } from "../ui/styles.css"
import { Tag } from "../tag/tag"

type NoteAction = {
    icon: ReactNode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: (...args: any[]) => any
}

export type NoteProps = {
    note: Note
    onOpen?: (id: string) => void
    onDelete?: (id: string) => void
    onArchive?: (id: string) => void
}
export function NoteCard(props: PropsWithChildren<NoteProps>) {
    const { note, onOpen, onDelete, onArchive } = props

    const handleOpen = useCallback(() => {
        if (!note.id) {
            console.error("Missing Note Information: ", {
                note,
                time: note.time,
            })
            return
        }

        onOpen && note.id && onOpen(note.id)
    }, [note, onOpen])

    const handleDelete = useCallback(() => {
        if (!note.id) {
            console.error("Missing Note Information: ", {
                note,
                id: note.id,
            })
            return
        }

        onDelete && onDelete(note.id)
    }, [note, onDelete])

    const handleArchive = useCallback(() => {
        if (!note.id) {
            console.error("Missing Note Information", {
                note,
                time: note.id,
            })
            return
        }

        onArchive && onArchive(note.id)
    }, [note, onArchive])

    const noteActions: NoteAction[] = useMemo(
        () => [
            {
                icon: <Maximize2 color={themeVars.color.secondary} />,
                action: handleOpen,
            },
            {
                icon: <Trash color={themeVars.color.secondary} />,
                action: handleDelete,
            },
            {
                icon: <Archive color={themeVars.color.secondary} />,
                action: handleArchive,
            },
        ],
        [handleDelete, handleOpen, handleArchive],
    )

    return (
        <div key={note.time} className={container}>
            <div className={blocksContainer}>
                {note.blocks.map((block) => (
                    <div
                        className={blockStyle}
                        key={block.id}
                        data-type={block.type}
                    >
                        {block.data.text}
                    </div>
                ))}
            </div>

            <div>{note.tags && note.tags.map((tag) => <Tag tag={tag} />)}</div>

            <div
                style={{
                    display: "flex",
                    gap: "4px",
                    flexDirection: "row-reverse",
                    borderTop: `1px dashed ${themeVars.background.secondary}`,
                    marginTop: "16px",
                    paddingTop: "4px",
                }}
            >
                {noteActions.map(({ icon, action }, idx) => (
                    <Button icon={icon} onClick={action} key={idx} />
                ))}
            </div>
        </div>
    )
}
