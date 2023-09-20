import { useCallback, useEffect, useRef } from "react"
import EditorJS, { OutputData } from "@editorjs/editorjs"
import { tools } from "../components/editor/editor-tools"

const EDITOR_HOLDER_ID = "editorjs"
export function useEditor() {
    const instance = useRef<EditorJS | null>(null)
    const initEditor = useCallback(() => {
        if (instance.current) return

        const data: OutputData = {
            blocks: [],
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
    }, [instance])

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
    }, [initEditor])

    return {
        instance,
    }
}
