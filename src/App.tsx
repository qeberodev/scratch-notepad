import { useState } from "react"
import "./App.css"
import { container } from "./application.css"
import { Button } from "./components/ui/button/button"
import { Plus } from "react-feather"
import { SearchBar } from "./components/search-bar"
import { Editor } from "./components/editor/editor"
import { useNotes } from "./model/note"
import { NoteCard } from "./components/note/note"

function App() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [entry, setEntry] = useState("")
    const [selectedNote, setSelectedNote] = useState<string>()
    const [getNotes, deleteNote, archiveNote] = useNotes((state) => [
        state.getNotes,
        state.delete,
        state.archive,
    ])

    const createNote = () => {
        setSelectedNote(undefined)
        setDialogOpen(true)
    }

    const handleOpen = (id: string) => {
        setSelectedNote(id)
        setDialogOpen(true)
    }
    const handleDelete = (id: string) => {
        deleteNote(id)
    }
    const handleArchive = (id: string) => {
        archiveNote(id, true)
    }

    return (
        <main className={container}>
            <Editor
                selectedNote={selectedNote}
                open={dialogOpen}
                onChange={setDialogOpen}
            />

            <section>
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <span
                        style={{
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    >
                        <Button
                            onClick={createNote}
                            style={{
                                top: "60px",
                            }}
                        >
                            <Plus color={"#ff6025"} />
                        </Button>
                    </span>

                    <span>Home</span>

                    <span
                        style={{
                            position: "absolute",
                            right: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    >
                        <SearchBar
                            value={entry}
                            onChange={(e) => setEntry(e.currentTarget.value)}
                            onClose={() => setEntry("")}
                        />
                    </span>
                </div>
            </section>

            <section>
                {getNotes('not-archived').map((note) => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        onOpen={handleOpen}
                        onDelete={handleDelete}
                        onArchive={handleArchive}
                    />
                ))}
            </section>
        </main>
    )
}

export default App
