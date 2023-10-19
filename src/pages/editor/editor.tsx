import { EditorHeader, EditorHeaderProps } from "@app/components/editor/header"
import { SidePanel } from "@app/components/sidepanel"
import { useEditor } from "@app/hooks/use-editor"
import { Note, useNotes } from "@app/model/note"
import { theme as _theme } from "antd"
import { Fragment, KeyboardEventHandler, useCallback, useMemo, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { container } from "."
import { useSettings } from "@app/model/settings"
import { useParams } from "react-router-dom"

export type EditorProps = EditorHeaderProps & {
    note?: Note
    onSave?: (note: Note) => void
}
/**
 * @description Page for adding a new note.
 * @author Zablon Dawit <zablon@qebero.dev>
 */
export function Editor(props: EditorProps) {
    const { onArchive, onDelete } = props
    const params = useParams()
    const { id } = useMemo(() => {
        return params as { id: string }
    }, [params])

    const { saveNote, getNote } = useNotes()
    const [note, setNote] = useState(getNote(id))

    const onSave = useCallback(
        (updated: Note) => {
            setNote((prev) => saveNote({ id: prev?.id, ...updated }))
        },
        [setNote],
    )

    const editorContainerRef = useRef<HTMLDivElement>(null)
    const { instance } = useEditor({ note, onSave, ref: editorContainerRef })
    const { token } = _theme.useToken()
    const { theme, sidepanelOpen, setSidePanelOpen } = useSettings()
    const handleCmdSave: KeyboardEventHandler<HTMLDivElement> = useCallback(
        async (e) => {
            const editor = instance.current
            if (!editor) return

            if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault()
                onSave((await editor.saver.save()) as Note)
            }
        },
        [onSave],
    )

    return (
        <Fragment>
            {/* Render Sidepanel outside of component tree and inside root body */}
            {ReactDOM.createPortal(
                <SidePanel theme={theme} open={sidepanelOpen} onClose={() => setSidePanelOpen(false)} />,
                document.body,
            )}

            <EditorHeader onSidepanelOpen={() => setSidePanelOpen(true)} onArchive={onArchive} onDelete={onDelete} />
            <div
                ref={editorContainerRef}
                onKeyDown={handleCmdSave}
                style={{ backgroundColor: token.colorBgBase }}
                className={container}
            />
        </Fragment>
    )
}
