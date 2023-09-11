import EditorJS, { OutputData } from "@editorjs/editorjs"
import { DialogContainer, DialogContainerProps } from "../ui/dialog"
import { PropsWithChildren, useCallback, useEffect, useRef } from "react"
import { tools } from "./editor-tools"
import { container, dialog } from "./editor.css"
import { Button } from "../ui/button/button"
import { Save, X, RotateCcw } from "react-feather"
import { useNotes } from "../../model/note"

type EditorProps = DialogContainerProps & {
    type: "buffer" | "saved"
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
    const { ...rest } = props
    const { save } = useNotes()

    const instance = useRef<EditorJS | null>(null)
    const initEditor = useCallback(() => {
        if (!props.open) return

        const editor = new EditorJS({
            holder: EDITOR_HOLDER_ID,
            data: defaultData,
            autofocus: true,
            hideToolbar: false,
            tools: tools,
            onReady: () => {
                instance.current = editor
            },
        })
    }, [props.open])

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
            save(note)
        } catch (err) {
            console.error("Error Saving Note: ", { err })
        }
    }, [instance, save])

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
                    title="Undo"
                    onClick={() => console.log("Undo Changes")}
                    icon={<RotateCcw color="white" />}
                />
            </div>
            {props.open && <div id={EDITOR_HOLDER_ID} className={container} />}
        </DialogContainer>
    )
}
