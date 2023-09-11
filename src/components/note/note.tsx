import { PropsWithChildren } from "react"
import { Note } from "../../model/note"
import { container } from "./note.css"
import { Button } from "../ui/button/button"
import { Maximize2 } from "react-feather"
import { COLOR } from "../ui/styles.css"

export function Note(props: PropsWithChildren<{ note: Note }>) {
    const { note } = props
    const handleOpen = () => {
        console.log("Opening: ", {
            note,
        })
    }

    return (
        <div className={container}>
            {note.blocks.map((block) => (
                <div>{block.data.text}</div>
            ))}

            <div>
                <Button
                    icon={<Maximize2 color={COLOR.secondary} />}
                    onClick={handleOpen}
                />
            </div>
        </div>
    )
}
