import { EditorHeader, EditorHeaderProps } from "@app/components/editor/header"
import { useEditor } from "@app/hooks/use-editor"
import { Fragment, useRef } from "react"
import { container } from "."
import { Note } from "@app/model/note"

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
    const editorContainerRef = useRef<HTMLDivElement>(null)

    return (
        <Fragment>
            <EditorHeader onArchive={onArchive} onDelete={onDelete} />
            <div ref={editorContainerRef} id={EDITOR_HOLDER_ID} className={container} />
        </Fragment>
    )
}
