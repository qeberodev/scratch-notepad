import { AvailableTag, useNotes } from "@app/model/note"
import { useCallback } from "react"

export function useTagFilter() {
    const { tags, currentFilter, filterByTag } = useNotes()
    const filterBy = useCallback(
        (id: AvailableTag) => filterByTag(id),
        [tags, filterByTag],
    )

    return {
        filterBy,
        currentFilter,
    }
}
