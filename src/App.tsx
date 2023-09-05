import { useState } from "react"
import "./App.css"
import { container } from "./application.css"
import { DialogContainer } from "./components/ui/dialog"
import { Button } from "./components/ui/button/button"
import { Plus, Search } from "react-feather"
import { COLOR } from "./components/ui/styles.css"
import { SearchBar } from "./components/search-bar"

function App() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [entry, setEntry] = useState("")

    return (
        <main className={container}>
            <DialogContainer open={dialogOpen} onChange={setDialogOpen} />

            <section>
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <span
                        style={{
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    >
                        <Button
                            onClick={() => setDialogOpen(true)}
                            style={{
                                top: "60px",
                            }}
                        >
                            <Plus color={"#ff6025"} />
                        </Button>
                    </span>

                    <span>Home</span>

                    <span
                        style={{
                            position: "absolute",
                            right: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    >
                        <SearchBar
                            value={entry}
                            onChange={(e) => setEntry(e.currentTarget.value)}
                            onClose={() => setEntry("")}
                        />
                    </span>
                </div>
            </section>
        </main>
    )
}

export default App
