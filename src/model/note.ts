import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { OutputData } from "@editorjs/editorjs"
import { persist } from "zustand/middleware"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Note extends OutputData {}
type State = {
    notes: Record<string, Note>
}
type Action = {
    save: (note: Note) => void
    delete: (id: string) => void
}

export const useNotes = create(
    persist(
        immer<State & Action>((set) => {
            return {
                notes: {},

                save: (note) => {
                    set((state) => {
                        if (!note) {
                            console.warn("Missing Note Id: ", { note })
                        } else {
                            console.log("Save Note: ", { note })
                            state.notes["note"] = note
                        }
                    })
                },
                delete: (id) => {
                    set((state) => delete state.notes[id])
                },
            }
        }),
        {
            name: "react-animations",
        },
    ),
)
