import { useCallback, useEffect, useRef } from "react"
import EditorJS, { OutputBlockData, OutputData } from "@editorjs/editorjs"
import { tools } from "../components/editor/editor-tools"
import { Note } from "@app/model/note"

const EDITOR_HOLDER_ID = "editorjs"
export function useEditor(props: { note?: Note; onSave?: (note: Note) => void }) {
    const { note, onSave } = props

    const instance = useRef<EditorJS | null>(null)
    const initEditor = useCallback(() => {
        if (instance.current) return

        const data: OutputData & Note = note
            ? note
            : ({
                  blocks: <OutputBlockData<string, any>[]>[],
              } as Note)

        const editor = new EditorJS({
            data,
            holder: EDITOR_HOLDER_ID,
            autofocus: false,
            hideToolbar: false,
            tools: tools,
            onReady: () => {
                instance.current = editor
            },
            onChange: async () => {
                onSave?.(data)
            },
            placeholder: "Start Typing Here 🖊️...",
        })
    }, [instance, note])

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
        EDITOR_HOLDER_ID,
    }
}
