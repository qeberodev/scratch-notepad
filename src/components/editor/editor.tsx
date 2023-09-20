/**
 * @description Editor Component Module
 * @summary Used for adding new notes or modifying existing notes.
 *  The Module should work as listed below
 *      - Should save changes when the save button is clicked
 *      - Should save note when the editor closes, if an existing note was open
 *      - Should not save note when a new note is created but the editor is
 *          closed without explicitly saving the note using the save button
 *
 * @author Zablon Dawit <zablon@qebero.dev>
 */
import EditorJS, { OutputData } from "@editorjs/editorjs"
import { DialogContainer, DialogContainerProps } from "../ui/dialog"
import {
    KeyboardEventHandler,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import { tools } from "./editor-tools"
import { container, dialog, tag, tagInput } from "./editor.css"
import { Button } from "../ui/button/button"
import { Save, X, RotateCcw, Archive, Trash2 } from "react-feather"
import { Tag, useNotes } from "../../model/note"
import { themeVars } from "../ui/styles.css"

type EditorProps = DialogContainerProps & {
    selectedNote?: string
}

const defaultData: OutputData = {
    blocks: [
        {
            type: "header",
            data: {
                text: "You can start writing right here 😍",
                level: 1,
            },
        },
    ],
}

const EDITOR_HOLDER_ID = "editorjs"
export function Editor(props: PropsWithChildren<EditorProps>) {
    const { selectedNote: id, onChange, ...rest } = props
    const [selectedNote, setSelectedNote] = useState(id)
    const { save, get, notes } = useNotes()
    const note = useMemo(() => {
        return (
            (!!selectedNote && get(selectedNote)) || {
                blocks: [],
                tags: [],
            }
        )
    }, [selectedNote, get])
    const [tags, setTags] = useState(note.tags)
    const notesAvailable = useMemo(
        () => Object.keys(notes).length !== 0,
        [notes],
    )

    useEffect(() => {
        console.log({ note })
    }, [note])

    const initScheduled = useRef(false)
    const instance = useRef<EditorJS | null>(null)
    const initEditor = useCallback(() => {
        initScheduled.current = true
        if (instance.current) return

        let data: OutputData
        if (!selectedNote) {
            if (!notesAvailable) {
                data = defaultData
            } else {
                data = {
                    blocks: [],
                }
            }
        } else {
            const fetchedNote = get(selectedNote)
            data = fetchedNote ?? defaultData
        }

        const editor = new EditorJS({
            data,
            tools: tools,
            autofocus: false,
            hideToolbar: false,
            holder: EDITOR_HOLDER_ID,
            placeholder: "Start Typing Here 🖊️...",
            onReady: () => {
                instance.current = editor
            },
        })
    }, [get, notesAvailable, selectedNote])

    // This will run only once
    useEffect(() => {
        if (initScheduled.current) return
        if (instance.current) return

        initEditor()

        return () => {
            if (instance.current) {
                instance.current.destroy()
                instance.current = null
            }
        }
    }, [initEditor])

    const saveNote = useCallback(async () => {
        try {
            const note = await instance.current?.save()

            if (!note) return
            if (note.blocks.length === 0) return

            const saved = save({ ...note, id: selectedNote, tags })
            setSelectedNote(saved.id)
        } catch (err) {
            console.error("Error Saving Note: ", { err })
        }
    }, [tags, save, selectedNote])

    const closeEditor = useCallback(() => {
        selectedNote && saveNote()
        onChange && onChange(false)
    }, [onChange, saveNote, selectedNote])

    /**
     * @description A list of note actions that can be performed using
     *      the toolbar.
     **/
    const actionList = useMemo(() => {
        return [
            {
                title: "Undo",
                action: () => console.log("Undo Changes"),
                icon: <RotateCcw color={themeVars.color.secondary} />,
            },
            {
                title: "Archive Note",
                action: () => console.log("Archiving Note"),
                icon: <Archive color={themeVars.color.secondary} />,
            },
            {
                title: "Delete Note",
                action: () => console.log("Deleting Note"),
                icon: <Trash2 color={themeVars.color.secondary} />,
            },
            {
                title: "Save Note",
                action: saveNote,
                icon: <Save color={themeVars.color.secondary} />,
            },
            {
                title: "Close Editor",
                action: closeEditor,
                icon: <X color={themeVars.color.secondary} />,
            },
        ]
    }, [closeEditor, saveNote])

    /**
     * Handles keyboard actions for the editor window.
     * @param event
     */
    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = ({ key }) => {
        switch (key) {
            case "Escape": {
                closeEditor()
                return
            }
        }
    }

    const addTag = useCallback((tag: Tag) => {
        setTags((restTags) => {
            const exists = Boolean(restTags.find((t) => t.id === tag.id))

            if (exists) return restTags
            return [...restTags, tag]
        })
    }, [])

    const removeTag = useCallback(
        (id: string) => {
            const idx = tags.findIndex((t) => t.id === id)
            if (idx !== -1) {
                tags.splice(idx, 1)
            }

            setTags([...tags])
        },
        [tags, setTags],
    )

    /**
     * @description Handles `note tags` keyboard actions. Current actions
     * - `add`: Adding a tag using the Enter key
     * - `delete`: Deleting a tag using the Backspace Key
     */
    const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = useCallback(
        (e) => {
            const handleKeys = ["Enter"] as const

            const target = e.currentTarget
            const key = e.key as (typeof handleKeys)[number]

            const shouldHandle = handleKeys.includes(key)

            if (!shouldHandle) return
            e.preventDefault()

            switch (key) {
                case "Enter": {
                    addTag({ id: target.value })
                    target.value = ""
                    break
                }
            }
        },
        [addTag],
    )

    return (
        <DialogContainer closeBtn={false} className={dialog} {...rest}>
            <div
                onKeyDown={({ key }) => key === "Escape" && closeEditor()}
                autoFocus
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <span
                    style={{
                        flex: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span
                        style={{
                            display: "inline-flex",
                            gap: "4px",
                        }}
                    >
                        {tags.map((t) => (
                            <span
                                key={t.id}
                                className={tag}
                                style={{
                                    display: "flex",
                                    gap: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {t.id}

                                <button
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        width: 12,
                                        height: 12,
                                        border: "none",
                                        cursor: "pointer",
                                        backgroundColor: "transparent",
                                    }}
                                    onClick={() => removeTag(t.id)}
                                >
                                    <X
                                        size={12}
                                        color={themeVars.color.secondary}
                                        enableBackground={
                                            themeVars.background.primary
                                        }
                                    />
                                </button>
                            </span>
                        ))}
                    </span>
                    <input
                        type="text"
                        className={tagInput}
                        data-emptied="false"
                        onKeyUp={handleKeyUp}
                        placeholder={!tags.length ? "Add Tags Here" : ""}
                    />
                </span>

                {actionList.map(({ action, title, icon }) => (
                    <Button
                        key={title}
                        style={{ margin: "0" }}
                        title={title}
                        onClick={action}
                        icon={icon}
                    />
                ))}
            </div>
            {props.open && (
                <div
                    onKeyDown={handleKeyDown}
                    id={EDITOR_HOLDER_ID}
                    className={container}
                />
            )}
        </DialogContainer>
    )
}
