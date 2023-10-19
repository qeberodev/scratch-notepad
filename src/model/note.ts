import { APP_NAME } from "@app/constants"
import { FilterOptions, byOptions } from "@app/utils/filter-notes"
import { OutputData } from "@editorjs/editorjs"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export class Tag {
    constructor(public id: string) {}
}
export interface Note extends OutputData {
    id?: string
    archived?: boolean
    tags: Tag[]
}

const defaultTags = ["home", "archived"] as const
export type DefaultTag = (typeof defaultTags)[number]
export type AvailableTag = DefaultTag | (string & {})

type State = {
    tags: Tag[]
    currentFilter: DefaultTag | (string & {})
    notes: Record<string, Note>
}
type Action = {
    clearData: () => void

    getNotes: (opts: FilterOptions) => Note[]
    getNote: (id: string) => Note | undefined
    saveNote: (note: Note) => Note
    deleteNote: (id: string) => void
    archiveNote: (id: string, archive: boolean) => void
    addNoteTag: (note: Note, tag: string) => void
    getNoteTag: (id: string) => Tag[]

    getTags: () => Tag[]
    filterByTag: (tagId: string) => void
    addTag: (tag: Tag) => void
}

const generateUUID = () => self.crypto.randomUUID()

const initialState: State = {
    notes: {},
    tags: [],
    currentFilter: "home",
}
export const useNotes = create<State & Action>()(
    persist(
        immer((set, get) => {
            const tagExists = (id: string) => Boolean(get().tags.find((t) => t.id === id))

            return {
                ...initialState,
                clearData: () => {
                    set((state) => {
                        state.tags = initialState.tags
                        state.notes = initialState.notes
                    })
                },

                getNotes: (opts = { tag: "home" }) => {
                    const notes = Object.values(get().notes)

                    return byOptions(notes, opts)
                },

                getNote: (id: string) => {
                    return get().notes[id]
                },
                saveNote: (note) => {
                    set((state) => {
                        !note.id && (note.id = generateUUID())
                        !note.tags && (note.tags = [])
                        !note.archived && (note.archived = false)

                        if (!note || !note.id) {
                            console.warn("Missing Note Details: ", {
                                note,
                                time: note.time,
                            })
                        } else {
                            // Note Does Exist
                            const { tags: newTags } = note
                            newTags.filter((t) => !tagExists(t.id)).forEach((t) => state.tags.push(t))

                            state.notes[note.id] = note
                        }
                    })

                    return note
                },
                archiveNote: (id, archive) => {
                    set((state) => {
                        const note = state.notes[id]

                        if (!note) return
                        note.archived = archive
                    })
                },
                deleteNote: (id: string) => {
                    set((state) => {
                        delete state.notes[id]
                    })
                },

                // Tags
                addNoteTag: (note: Note, t) => {
                    set((state) => {
                        const { tags } = state
                        if (tags.find((tag) => tag.id === t)) return

                        const newTag: Tag = new Tag(t)
                        state.tags.push(newTag)

                        const id = note.id
                        if (!id) throw Error("Note doesn't exist")
                        const savedNote = get().notes[id]

                        if (!savedNote) throw new Error("Note instance doesn't exist")

                        state.notes[id] = { ...note, tags: [...tags, newTag] }
                    })
                },
                getNoteTag: (id) => {
                    const note = get().notes[id]
                    if (!note) throw new Error("Note instance doesn't exist")

                    return note.tags
                },
                getTags: () => get().tags,
                addTag: (tag) => {
                    set((state) => {
                        state.tags.push(tag)
                    })
                },
                filterByTag: (id) => {
                    set((state) => {
                        const tags = get().tags
                        const found = tags.find((t) => t.id === id)
                        const found_default = defaultTags.find((t) => t === id)

                        if (found) {
                            state.currentFilter = found.id
                        } else if (found_default) {
                            state.currentFilter = found_default
                        }
                    })
                },
            }
        }),
        {
            name: `${APP_NAME}-notes`,
        },
    ),
)
