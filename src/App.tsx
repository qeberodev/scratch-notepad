import { useState } from "react"
import "./App.css"
import { container } from "./application.css"
import { Button } from "./components/ui/button/button"
import { Plus } from "react-feather"
import { SearchBar } from "./components/search-bar"
import { Editor } from "./components/editor/editor"
import { useNotes } from "./model/note"
import { Note } from "./components/note/note"

function App() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [entry, setEntry] = useState("")
    const notes = useNotes((state) => state.notes)

    return (
        <main className={container}>
            <Editor type="buffer" open={dialogOpen} onChange={setDialogOpen} />

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
                            onClick={() => setDialogOpen(true)}
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
                {Object.entries(notes).map(([id, note]) => (
                    <Note key={id} note={note} />
                ))}
            </section>
        </main>
    )
}

export default App
