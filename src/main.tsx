import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import "./style.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Home } from "./pages/main.tsx"
import { Editor } from "./pages/editor"

const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
        children: [],
    },
    {
        path: "/note/new",
        Component: Editor,
    },
    {
        path: "/app",
        Component: App,
    },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
