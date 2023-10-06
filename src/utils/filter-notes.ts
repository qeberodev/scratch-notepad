export const byOptions = (notes: Note[], opts: FilterOptions): Note[] => {
    let filtered: Note[] = []
    switch (opts.tag) {
        case "home": {
            filtered = notes.filter((note) => !note.archived)
            break
        }
        case "archived": {
            filtered = notes.filter((note) => note.archived)
            break
        }
        default: {
            if (opts.tag) {
                filtered = notes.filter(
                    (note) => !!note.tags.find((t) => t.id == opts.tag),
                )
            }
        }
    }

    return filtered
}
