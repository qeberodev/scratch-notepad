import {
    PropsWithChildren,
    ReactNode,
    useCallback,
    useMemo,
    useState,
} from "react"
import { container, block as blockStyle, blocksContainer } from "./note.css"
import { Button } from "../ui/button/button"
import { Maximize2, Trash2, Archive } from "react-feather"
import type { Note } from "../../model/note"
import { themeVars } from "../ui/styles.css"
import { Tag } from "../tag/tag"
import { Alert } from "../alert"

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
    const [deletePrompt, setDeletePrompt] = useState(false)

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

        if (!deletePrompt) {
            setDeletePrompt(true)
        } else {
            onDelete && onDelete(note.id)
            setDeletePrompt(false)
        }
    }, [note, onDelete, deletePrompt])

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
                icon: <Trash2 color={themeVars.color.secondary} />,
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
            <Alert open={deletePrompt} onChange={setDeletePrompt}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                    }}
                >
                    <div>
                        You are about to delete the selected note? Are you sure
                        you want to delete the note?
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexDirection: "row-reverse",
                        }}
                    >
                        <Button onClick={() => setDeletePrompt(false)}>
                            Cancel
                        </Button>
                        <Button
                            style={{
                                color: "red",
                            }}
                            icon={<Trash2 />}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Alert>

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

            <div>
                <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                    {note.tags &&
                        note.tags.map((tag) => <Tag key={tag.id} tag={tag} />)}
                </div>

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
        </div>
    )
}
