import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { OutputData } from "@editorjs/editorjs"
import { persist } from "zustand/middleware"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Note extends OutputData {
    id?: string
    archived?: boolean
}
type State = {
    notes: Record<string, Note>
}
const _note_states = ["archived", "all", "not-archived"] as const
type NoteState = (typeof _note_states)[number]
type Action = {
    getNotes: (filter?: NoteState) => Note[]
    get: (id: string) => Note | undefined
    save: (note: Note) => void
    delete: (id: string) => void
    archive: (id: string, archive: boolean) => void
}

const generateUUID = () => self.crypto.randomUUID()

export const useNotes = create(
    persist(
        immer<State & Action>((set, get) => {
            return {
                notes: {},

                getNotes: (filter = "all") => {
                    const notes = Object.values(get().notes)

                    switch (filter) {
                        case "archived": {
                            const filtered = notes.filter(
                                (note) => note.archived === true,
                            )

                            return filtered
                        }
                        case "not-archived": {
                            const filtered = notes.filter(
                                (note) => !note.archived,
                            )

                            return filtered
                        }
                        case "all":
                        default: {
                            return notes
                        }
                    }
                },

                get: (id: string) => {
                    return get().notes[id]
                },
                save: (note) => {
                    set((state) => {
                        if (!note.id) {
                            note.id = generateUUID()
                        }
                        if (!note || !note.id) {
                            console.warn("Missing Note Details: ", {
                                note,
                                time: note.time,
                            })
                        } else {
                            console.log("Save Note: ", { note })

                            state.notes[note.id] = note
                        }
                    })
                },
                archive: (id, archive) => {
                    set((state) => {
                        const note = state.notes[id]

                        if (!note) return
                        note.archived = archive
                    })
                },
                delete: (id: string) => {
                    set((state) => {
                        delete state.notes[id]
                    })
                },
            }
        }),
        {
            name: "react-animations",
        },
    ),
)
