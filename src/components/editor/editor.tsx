import EditorJS, { OutputData } from "@editorjs/editorjs"
import { DialogContainer, DialogContainerProps } from "../ui/dialog"
import {
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from "react"
import { tools } from "./editor-tools"
import { container, dialog } from "./editor.css"
import { Button } from "../ui/button/button"
import { Save, X, RotateCcw, Archive, Trash2 } from "react-feather"
import { useNotes } from "../../model/note"

type EditorProps = DialogContainerProps & {
    selectedNote?: string
}

const defaultData: OutputData = {
    blocks: [
        {
            type: "header",
            data: {
                text: "You can start writing right here 😍",
                level: 1,
            },
        },
    ],
}

const EDITOR_HOLDER_ID = "editorjs"
export function Editor(props: PropsWithChildren<EditorProps>) {
    const { selectedNote, ...rest } = props
    const { save, get, notes } = useNotes()
    const notesAvailable = useMemo(
        () => Object.keys(notes).length !== 0,
        [notes],
    )

    const instance = useRef<EditorJS | null>(null)
    const initEditor = useCallback(() => {
        if (!props.open) return

        let data: OutputData
        if (!selectedNote) {
            if (!notesAvailable) {
                data = defaultData
            } else {
                data = {
                    blocks: [],
                }
            }
        } else {
            const fetchedNote = get(selectedNote)
            data = fetchedNote ?? defaultData
        }

        const editor = new EditorJS({
            data,
            holder: EDITOR_HOLDER_ID,
            autofocus: false,
            hideToolbar: false,
            tools: tools,
            onReady: () => {
                instance.current = editor
            },
            placeholder: "Start Typing Here 🖊️...",
        })
    }, [get, notesAvailable, props.open, selectedNote])

    // This will run only once
    useEffect(() => {
        if (!instance.current) {
            initEditor()
        }
        return () => {
            if (instance.current) {
                instance.current.destroy()
                instance.current = null
            }
        }
    }, [initEditor, props.open])

    const saveNote = useCallback(async () => {
        try {
            const note = await instance.current?.save()

            if (!note) return
            if (note.blocks.length === 0) return

            save({ ...note, id: selectedNote, tags: [] })
        } catch (err) {
            console.error("Error Saving Note: ", { err })
        }
    }, [save, selectedNote])

    // const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    //     const { metaKey, key } = e
    //     const isEnter = key === "Enter"

    //     if (metaKey && isEnter) {
    //         e.preventDefault()
    //         e.stopPropagation()
    //         saveNote()
    //     }
    // }

    return (
        <DialogContainer closeBtn={false} className={dialog} {...rest}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                }}
            >
                <Button
                    style={{ margin: "0" }}
                    onClick={() => {
                        props.onChange?.(false)
                    }}
                    icon={<X color="white" />}
                />

                <Button
                    style={{ margin: "0" }}
                    title="Save Note"
                    onClick={saveNote}
                    icon={<Save color="white" />}
                />

                <Button
                    style={{ margin: "0" }}
                    title="Delete Note"
                    icon={<Trash2 color="white" />}
                />

                <Button
                    style={{ margin: "0" }}
                    title="Archive Note"
                    icon={<Archive color="white" />}
                />

                <Button
                    style={{ margin: "0" }}
                    title="Undo"
                    onClick={() => console.log("Undo Changes")}
                    icon={<RotateCcw color="white" />}
                />
            </div>
            {props.open && (
                <div
                    // onKeyDown={handleKeyDown}
                    id={EDITOR_HOLDER_ID}
                    className={container}
                />
            )}
        </DialogContainer>
    )
}
