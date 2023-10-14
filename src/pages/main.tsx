import React from "react"
import { MainHeader } from "@app/components/main-header"
import { Outlet } from "react-router-dom"

export function Home() {
    return (
        <React.Fragment>
            <MainHeader />
            <main>
                <Outlet />
            </main>
        </React.Fragment>
    )
}
