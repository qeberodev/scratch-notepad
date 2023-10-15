import { Meta, StoryObj } from "@storybook/react"
import { EditorHeader } from "./editor-header"

const meta = {
    title: "Components/EditorHeader",
    component: EditorHeader,
    parameters: {
        layout: "fullscreen",
    },
    argTypes: {
        tags: {
            control: "array",
            defaultValue: [],
        },
    },
} satisfies Meta<typeof EditorHeader>
export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
    args: {
        tags: [],
    },
}

export const Tagged: Story = {
    args: {
        tags: [
            {
                id: "tag-1",
            },
            {
                id: "tag-2",
            },
            {
                id: "tag-3",
            },
        ],
    },
}
