import { useCallback, useEffect, useRef } from "react"
import EditorJS, { OutputBlockData, OutputData } from "@editorjs/editorjs"
import { Note } from "@app/model/note"

import Header from "@editorjs/header"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore no types defined
import NestedList from "@editorjs/nested-list"
import { EditorConfig } from "@editorjs/editorjs"

/** "paragraph" is a default tool in EditorJS. Wouldn't be listed explicitly in tools config */
const _tools = ["header", "paragraph", "list"] as const
export type Tool = (typeof _tools)[number]
export const toolsConfig: EditorConfig["tools"] = {
    header: Header,
    list: {
        class: NestedList,
        inlineToolbar: true,
        config: {
            defaultStyle: "unordered",
        },
    },
} as const

const EDITOR_HOLDER_ID = "editorjs"
export function useEditor(props: { note?: Note; onSave?: (note: Note) => void }) {
    const { note, onSave } = props

    /**
     * Will run only once, this is to prevent the editor from being initialized multiple times.
     * @link https://stackoverflow.com/questions/67990522/editorjs-always-renders-two-editors
     */
    const initDone = useRef(false)
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
            tools: toolsConfig,
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
        if (initDone.current) return
        if (!instance.current) {
            initEditor()
            initDone.current = true
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
