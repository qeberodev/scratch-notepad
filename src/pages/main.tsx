import React, { useCallback } from "react"
import ReactDOM from "react-dom"
import { MainHeader } from "@app/components/main-header"
import { Outlet, useNavigate } from "react-router-dom"
import { SidePanel } from "@app/components/sidepanel"
import { useSettings } from "@app/model/settings"

export function Home() {
    const { sidepanelOpen, setSidePanelOpen } = useSettings()
    const nav = useNavigate()

    // Handler Functions
    const goToEditor = useCallback(() => nav("/note/new"), [])

    return (
        <React.Fragment>
            <MainHeader onNew={goToEditor} onSidepanelOpen={() => setSidePanelOpen(true)} />
            {/* Portal Sidepanel out of the current element tree and embed in the body of DOM */}
            {ReactDOM.createPortal(
                <SidePanel theme="dark" open={sidepanelOpen} onClose={() => setSidePanelOpen(false)} />,
                document.body,
            )}

            <main>
                <Outlet />
            </main>
        </React.Fragment>
    )
}
