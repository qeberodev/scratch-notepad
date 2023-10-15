import { SidePanel } from "./sidepanel"
import { Meta, StoryObj } from "@storybook/react"

const meta = {
    title: "Components/SidePanel",
    component: SidePanel,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["sidepanel", "panel", "side"],
} satisfies Meta<typeof SidePanel>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        open: true,
    },
}
