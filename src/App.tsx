import { useMemo, useRef, useState } from "react"
import { Plus, Settings } from "react-feather"
import "./App.css"
import { container, noteList } from "./application.css"
import { ArchivedButton } from "./components/archived-button/archived-button"
import { Editor } from "./components/editor/editor"
import { NoteCard } from "./components/note/note"
import { SearchBar } from "./components/search-bar"
import { Page, SettingsPanel } from "./components/settings-panel"
import { SidePanel } from "./components/side-panel"
import { Button } from "./components/ui/button/button"
import { themeVars } from "./components/ui/styles.css"
import { useTheme } from "./hooks/use-theme"
import { useNotes } from "./model/note"
import { TagSelectList } from "./components/tag-select-list"
import { useTagFilter } from "./hooks/use-tag-filter"

function App() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [entry, setEntry] = useState("")
    const [selectedNote, setSelectedNote] = useState<string>()
    const [sidePanelOpen, setSidePanelOpen] = useState(false)
    const [notes, getNotes, deleteNote, archiveNote, tags] = useNotes((state) => [
        state.notes,
        state.getNotes,
        state.deleteNote,
        state.archiveNote,
        state.tags,
    ])
    const [settingsPage, setSettingsPage] = useState<Page>("home")
    const { vars } = useTheme()

    const archivedCount = useMemo(() => {
        return getNotes({ tag: "archived" }).length
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notes, getNotes])
    const mainRef = useRef<HTMLDivElement>(null)

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

    const { filterBy, currentFilter } = useTagFilter()

    return (
        <div style={vars}>
            <main ref={mainRef} id="app-root-main" className={container}>
                <SidePanel
                    root={mainRef.current}
                    open={sidePanelOpen}
                    onClose={(state) => {
                        setSidePanelOpen(state)
                        setSettingsPage("home")
                    }}
                >
                    <SettingsPanel page={settingsPage} onChange={(page) => setSettingsPage(page)} />
                </SidePanel>

                <Editor
                    root={mainRef.current}
                    selectedNote={selectedNote}
                    onSelectedNoteChange={setSelectedNote}
                    open={dialogOpen}
                    onChange={setDialogOpen}
                />

                <section
                    style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "8px",
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

                    <TagSelectList selectedTag={currentFilter} onTagChange={filterBy} tags={tags} />

                    <span
                        style={{
                            display: "flex",
                            flexDirection: "row-reverse",
                            gap: "4px",
                        }}
                    >
                        <Button
                            icon={<Settings color={themeVars.color.secondary} />}
                            onClick={() => setSidePanelOpen(true)}
                        />
                        <ArchivedButton onClick={() => filterBy("archived")} count={archivedCount} />
                        <SearchBar
                            value={entry}
                            onChange={(e) => setEntry(e.currentTarget.value)}
                            onClose={() => setEntry("")}
                        />
                    </span>
                </section>

                <section className={noteList}>
                    {getNotes({ tag: currentFilter }).map((note) => (
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
