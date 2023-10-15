import { EditorHeader as _EditorHeader, EditorHeaderProps } from "@app/components/editor/header"
import { Tag } from "@app/model/note"
import { useState } from "react"

export function EditorHeader(props: EditorHeaderProps) {
    const [tags, setTags] = useState<Tag[]>(props.tags ?? [])
    return (
        <_EditorHeader
            {...props}
            onArchive={() => console.log("Archiving Note")}
            onDelete={() => console.log("Deleting Note")}
            onOpenSettings={() => console.log("Opening Settings")}
            setTags={setTags}
            tags={tags}
        />
    )
}
