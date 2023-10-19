import { MainHeader } from "@app/components/main-header"
import { NoteCard } from "@app/components/note-card"
import { Tag, useNotes } from "@app/model/note"
import { useSettings } from "@app/model/settings"
import { Empty, Flex, theme } from "antd"
import { Fragment, useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"

export function Home() {
    const { setSidePanelOpen } = useSettings()
    const { token } = theme.useToken()
    const nav = useNavigate()
    const { getNotes, deleteNote, archiveNote, notes } = useNotes()

    // Derived Values
    const archivedNotes = useMemo(() => getNotes({ tag: "archived" }).length, [notes])
    const selectedNotes = useMemo(() => getNotes({ tag: "home" }), [notes])
    const isEmpty = useMemo(() => selectedNotes.length === 0, [selectedNotes])

    // Handler Functions
    const goToEditor = useCallback(() => nav("note"), [])

    return (
        <Fragment>
            <Flex vertical gap={"small"}>
                <MainHeader
                    tags={[new Tag("Home"), new Tag("Archived")]}
                    archivedCount={archivedNotes}
                    onNew={goToEditor}
                    onSidepanelOpen={() => setSidePanelOpen(true)}
                />

                {isEmpty && (
                    <Empty
                        style={{
                            height: "100%",
                        }}
                    />
                )}

                <Flex
                    style={{ padding: token.padding }}
                    gap={"small"}
                    align="flex-start"
                    wrap={"wrap"}
                    data-testid="notes-container"
                >
                    {selectedNotes.map((note) => (
                        <NoteCard
                            onDelete={() => note.id && deleteNote(note.id)}
                            onArchive={() => note.id && archiveNote(note.id, true)}
                            onOpen={() => nav(`note/${note.id}`)}
                            key={note.id}
                            date={Date.now()}
                            note={note}
                        />
                    ))}
                </Flex>
            </Flex>
        </Fragment>
    )
}
