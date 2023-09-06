import EditorJS, { OutputData } from "@editorjs/editorjs"
import { DialogContainer, DialogContainerProps } from "../ui/dialog"
import { PropsWithChildren, useCallback, useEffect, useRef } from "react"
import { tools } from "./editor-tools"
import { container, dialog } from "./editor.css"

type EditorProps = DialogContainerProps

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

    const ejInstance = useRef<EditorJS | null>(null)

    const initEditor = useCallback(() => {
        if (!props.open) return

        const editor = new EditorJS({
            holder: EDITOR_HOLDER_ID,
            data: defaultData,
            autofocus: true,
            hideToolbar: false,
            tools: tools,
            onReady: () => {
                ejInstance.current = editor
            },
        })
    }, [props.open])

    // This will run only once
    useEffect(() => {
        if (!ejInstance.current) {
            initEditor()
        }
        return () => {
            if (ejInstance.current) {
                ejInstance.current.destroy()
                ejInstance.current = null
            }
        }
    }, [initEditor, props.open])

    return (
        <DialogContainer className={dialog} {...rest}>
            {props.open && <div id={EDITOR_HOLDER_ID} className={container} />}
        </DialogContainer>
    )
}
