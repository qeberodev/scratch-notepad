import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import { resolve } from "path"
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), vanillaExtractPlugin()],
    resolve: {
        alias: {
            "@app": resolve(__dirname, "src"),
            "@model": resolve(__dirname, "src", "model"),
            "@components": resolve(__dirname, "src", "components"),
            "@hooks": resolve(__dirname, "src", "hooks"),
        },
    },
})
