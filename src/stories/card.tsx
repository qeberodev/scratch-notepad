import { NoteCardProps, NoteCard } from "@components/note-card"

export function Card(props: NoteCardProps) {
    return (
        <NoteCard
            {...props}
            onArchive={() => console.log("Archiving Note")}
            onDelete={() => console.log("Deleting Note")}
            onOpen={() => console.log("Opening Note")}
            onUndoArchive={() => console.log("Undoing Archived Note")}
        >
            <h1>This is a sample note content</h1>
            <span>This is the paragraph of the note card.</span>
        </NoteCard>
    )
}
