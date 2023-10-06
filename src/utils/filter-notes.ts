import { AvailableTag, Note } from "@app/model/note"

export type FilterOptions = {
    tag?: AvailableTag
}

export const byOptions = (notes: Note[], opts: FilterOptions): Note[] => {
    switch (opts.tag) {
        case "home": {
            return notes.filter((note) => !note.archived)
        }
        case "archived": {
            return notes.filter((note) => note.archived)
        }
        default: {
            let filtered: Note[] = []
            if (opts.tag) {
                filtered = notes.filter(
                    (note) => !!note.tags.find((t) => t.id == opts.tag),
                )
            }
            return filtered
        }
    }
}
