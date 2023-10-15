import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import "./style.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Layout } from "@app/pages/layout"
import { Home } from "@pages/home"
import { Editor } from "@pages/editor"

const router = createBrowserRouter(
    [
        {
            path: "/",
            Component: Layout,
            children: [
                {
                    path: "/",
                    Component: Home,
                },
                {
                    path: "/note",
                    Component: Editor,
                },
            ],
        },
        {
            path: "/app",
            Component: App,
        },
    ],
    {
        basename: "/",
    },
)

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
