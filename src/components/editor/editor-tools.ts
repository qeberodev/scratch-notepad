import Header from "@editorjs/header"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore no types defined
import NestedList from "@editorjs/nested-list"
import { EditorConfig } from "@editorjs/editorjs"

export const tools: EditorConfig['tools']  = {
    header: Header,
    list: {
        class: NestedList,
        inlineToolbar: true,
        config: {
            defaultStyle: "unordered",
        },
    },
}
