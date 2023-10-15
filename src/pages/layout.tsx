import React from "react"
import ReactDOM from "react-dom"
import { Outlet } from "react-router-dom"
import { SidePanel } from "@app/components/sidepanel"
import { useSettings } from "@app/model/settings"

export function Layout() {
    const { sidepanelOpen, setSidePanelOpen } = useSettings()

    return (
        <React.Fragment>
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
