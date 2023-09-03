import { useState } from "react"
import "./App.css"
import { container, toggleBtn } from "./application.css"
import { SidePanel } from "./components/side-panel"
import { DialogContainer } from "./components/ui/dialog"

function App() {
    const [open, setOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <div className={container}>
            <SidePanel open={open} onClose={setOpen} />
            <DialogContainer open={dialogOpen} onChange={setDialogOpen} />

            <button className={toggleBtn} onClick={() => setOpen(!open)}>
                Toggle
            </button>
            <button
                className={toggleBtn}
                onClick={() => setDialogOpen(true)}
                style={{
                    top: "60px",
                }}
            >
                Open Dialog
            </button>
        </div>
    )
}

export default App
