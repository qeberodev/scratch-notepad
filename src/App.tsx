import { useMemo, useState } from "react"
import "./App.css"
import { container } from "./application.css"
import { Button } from "./components/ui/button/button"
import { Plus, Settings } from "react-feather"
import { SearchBar } from "./components/search-bar"
import { Editor } from "./components/editor/editor"
import { useNotes } from "./model/note"
import { NoteCard } from "./components/note/note"
import { SidePanel } from "./components/side-panel"
import { SettingsPanel } from "./components/settings-panel"
import { ArchivedButton } from "./components/archived-button/archived-button"
import { Page } from "./components/settings-panel"
import { useTheme } from "./hooks/use-theme"
import { themeVars } from "./components/ui/styles.css"

function App() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [entry, setEntry] = useState("")
    const [selectedNote, setSelectedNote] = useState<string>()
    const [sidePanelOpen, setSidePanelOpen] = useState(false)
    const [notes, getNotes, deleteNote, archiveNote] = useNotes((state) => [
        state.notes,
        state.getNotes,
        state.delete,
        state.archive,
    ])
    const [settingsPage, setSettingsPage] = useState<Page>("home")
    const { vars } = useTheme()

    const archivedCount = useMemo(() => {
        return getNotes("archived").length
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notes, getNotes])

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
        <div style={vars}>
            {sidePanelOpen && (
                <SidePanel
                    open={sidePanelOpen}
                    onClose={(state) => {
                        setSidePanelOpen(state)
                        setSettingsPage("home")
                    }}
                >
                    <SettingsPanel
                        page={settingsPage}
                        onChange={(page) => setSettingsPage(page)}
                    />
                </SidePanel>
            )}

            <main className={container}>
                {dialogOpen && (
                    <Editor
                        selectedNote={selectedNote}
                        open={dialogOpen}
                        onChange={setDialogOpen}
                    />
                )}

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
                                <Plus color={themeVars.color.secondary} />
                            </Button>
                        </span>

                        <span>Home</span>

                        <span
                            style={{
                                position: "absolute",
                                right: 0,
                                top: "50%",
                                transform: "translateY(-50%)",

                                display: "flex",
                                flexDirection: "row-reverse",
                                gap: "4px",
                            }}
                        >
                            <Button
                                icon={
                                    <Settings
                                        color={themeVars.color.secondary}
                                    />
                                }
                                onClick={() => setSidePanelOpen(true)}
                            />
                            <ArchivedButton count={archivedCount} />
                            <SearchBar
                                value={entry}
                                onChange={(e) =>
                                    setEntry(e.currentTarget.value)
                                }
                                onClose={() => setEntry("")}
                            />
                        </span>
                    </div>
                </section>

                <section>
                    {getNotes("not-archived").map((note) => (
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
        </div>
    )
}

export default App
