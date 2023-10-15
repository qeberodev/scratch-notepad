import { MainHeader } from "@app/components/main-header"
import { NoteCard } from "@app/components/note-card"
import { useNotes } from "@app/model/note"
import { useSettings } from "@app/model/settings"
import { Flex, theme } from "antd"
import { Fragment, useCallback } from "react"
import { useNavigate } from "react-router-dom"

export function Home() {
    const { setSidePanelOpen } = useSettings()
    const { token } = theme.useToken()
    const nav = useNavigate()
    const { getNotes } = useNotes()

    // Handler Functions
    const goToEditor = useCallback(() => nav("note"), [])

    return (
        <Fragment>
            <Flex vertical gap={"small"}>
                <MainHeader onNew={goToEditor} onSidepanelOpen={() => setSidePanelOpen(true)} />

                <Flex
                    style={{ padding: token.padding }}
                    gap={"small"}
                    align="flex-start"
                    wrap={"wrap"}
                    data-testid="notes-container"
                >
                    {getNotes({ tag: "home" }).map((note) => (
                        <NoteCard key={note.id} date={Date.now()} note={note} />
                    ))}
                </Flex>
            </Flex>
        </Fragment>
    )
}
