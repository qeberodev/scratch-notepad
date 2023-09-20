import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { OutputData } from "@editorjs/editorjs"
import { persist } from "zustand/middleware"

export class Tag {
    constructor(public id: string) {}
}
export interface Note extends OutputData {
    id?: string
    archived?: boolean
    tags: Tag[]
}
const _note_states = ["archived", "all", "not-archived"] as const
type NoteState = (typeof _note_states)[number]

type State = {
    notes: Record<string, Note>
    tags: Tag[]
}
type Action = {
    clearData: () => void

    getNotes: (filter?: NoteState) => Note[]
    get: (id: string) => Note | undefined
    save: (note: Note) => Note
    delete: (id: string) => void
    archive: (id: string, archive: boolean) => void
    addTag: (note: Note, tag: string) => void
    getNoteTag: (id: string) => Tag[]

    getTags: () => Tag[]
}

const generateUUID = () => self.crypto.randomUUID()

const initialState: State = {
    notes: {},
    tags: [],
}
export const useNotes = create<State & Action>()(
    persist(
        immer((set, get) => {
            return {
                ...initialState,
                clearData: () => {
                    set((state) => {
                        state.tags = initialState.tags
                        state.notes = initialState.notes
                    })
                },

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

                    return note
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

                // Tags
                addTag: (note: Note, t) => {
                    set((state) => {
                        const { tags } = state
                        if (tags.find((tag) => tag.id === t)) return

                        const newTag: Tag = new Tag(t)
                        state.tags.push(newTag)

                        const id = note.id
                        if (!id) throw Error("Note doesn't exist")
                        const savedNote = get().notes[id]

                        if (!savedNote)
                            throw new Error("Note instance doesn't exist")

                        state.notes[id] = { ...note, tags: [...tags, newTag] }
                    })
                },
                getNoteTag: (id) => {
                    const note = get().notes[id]
                    if (!note) throw new Error("Note instance doesn't exist")

                    return note.tags
                },
                getTags: () => get().tags,
            }
        }),
        {
            name: "react-animations",
        },
    ),
)
