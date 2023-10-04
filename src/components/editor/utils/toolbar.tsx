import { useMemo, useState } from "react"
import { RotateCcw, Trash2, Archive, Save, X } from "react-feather"
import { Button } from "../../ui/button/button"
import { Popup } from "../../popup"
import { themeVars } from "../../ui/styles.css"

const DeleteConfirmation = (props: Pick<ToolbarActionsProps, "deleteNote">) => {
    const { deleteNote } = props
    const [deleteConfirm, showDeleteConfirm] = useState(false)

    return (
        <Popup
            open={deleteConfirm}
            trigger={
                <Button
                    style={{ margin: "0" }}
                    icon={<Trash2 />}
                    onClick={() => showDeleteConfirm((state) => !state)}
                />
            }
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 8,
                }}
            >
                <span>About to delete this note?</span>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 8,
                    }}
                >
                    <Button
                        style={{
                            cursor: "pointer",
                            color: themeVars.color.tertiary,
                        }}
                        icon={<Trash2 />}
                        onClick={() => {
                            deleteNote()
                            showDeleteConfirm(false)
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        style={{ cursor: "pointer" }}
                        onClick={() => showDeleteConfirm(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Popup>
    )
}

export type ToolbarActionsProps = {
    closeEditor: () => void
    saveNote: () => void
    deleteNote: () => void
    archiveNote: () => void
}
export function useToolbarActions(props: ToolbarActionsProps) {
    const { saveNote, closeEditor, archiveNote, deleteNote } = props

    /**
     * @description A list of note actions that can be performed using
     *      the toolbar.
     **/
    const actionList = useMemo(() => {
        return [
            {
                title: "Undo",
                action: () => console.log("Undo Changes"),
                icon: <RotateCcw color={themeVars.color.secondary} />,
            },
            {
                title: "Archive Note",
                action: archiveNote,
                icon: <Archive color={themeVars.color.secondary} />,
            },
            {
                title: "Delete Note",
                action: () => console.log("Deleting Note"),
                /** NOTE - key is used here because the component rendered doesn't have a key element  */
                component: (
                    <DeleteConfirmation key={55} deleteNote={deleteNote} />
                ),
            },
            {
                title: "Save Note",
                action: saveNote,
                icon: <Save color={themeVars.color.secondary} />,
            },
            {
                title: "Close Editor",
                action: closeEditor,
                icon: <X color={themeVars.color.secondary} />,
            },
        ]
    }, [archiveNote, deleteNote, saveNote, closeEditor])

    return {
        actionList,
    }
}
