import { SidePanelProps, SidePanel as _SidePanel } from "@app/components/sidepanel"
import { useState } from "react"

export function SidePanel(props: SidePanelProps) {
    const { open: o, ...rest } = props
    const [open, setOpen] = useState(o)

    return (
        <>
            <button style={{ margin: 8 }} onClick={() => setOpen(true)}>
                Open Side-Panel
            </button>
            <_SidePanel {...rest} open={open} onClose={() => setOpen(false)} />
        </>
    )
}
