import { useState } from "react"
import "./App.css"
import { container, toggleBtn } from "./application.css"
import { SidePanel } from "./components/side-panel"

function App() {
    const [open, setOpen] = useState(false)

    return (
        <div className={container}>
            <SidePanel open={open} onClose={setOpen} />
            <button className={toggleBtn} onClick={() => setOpen(!open)}>
                Toggle
            </button>
        </div>
    )
}

export default App
