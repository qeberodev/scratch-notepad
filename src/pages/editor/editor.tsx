import { EditorHeader, EditorHeaderProps } from "@app/components/editor/header"
import { SidePanel } from "@app/components/sidepanel"
import { useEditor } from "@app/hooks/use-editor"
import { Note } from "@app/model/note"
import { theme as _theme } from "antd"
import { Fragment, useRef } from "react"
import ReactDOM from "react-dom"
import { container } from "."
import { useSettings } from "@app/model/settings"

export type EditorProps = EditorHeaderProps & {
    note?: Note
    onSave?: (note: Note) => void
}
/**
 * @description Page for adding a new note.
 * @author Zablon Dawit <zablon@qebero.dev>
 */
export function Editor(props: EditorProps) {
    const { note, onArchive, onDelete, onSave } = props
    const { EDITOR_HOLDER_ID } = useEditor({ note, onSave })
    const { token } = _theme.useToken()
    const editorContainerRef = useRef<HTMLDivElement>(null)
    const { theme, sidepanelOpen, setSidePanelOpen } = useSettings()

    return (
        <Fragment>
            {/* Render Sidepanel outside of component tree and inside root body */}
            {ReactDOM.createPortal(
                <SidePanel theme={theme} open={sidepanelOpen} onClose={() => setSidePanelOpen(false)} />,
                document.body,
            )}

            <EditorHeader onSidepanelOpen={() => setSidePanelOpen(true)} onArchive={onArchive} onDelete={onDelete} />
            <div
                style={{ backgroundColor: token.colorBgBase }}
                ref={editorContainerRef}
                id={EDITOR_HOLDER_ID}
                className={container}
            />
        </Fragment>
    )
}
