import { Note } from "@app/model/note"
import { Editor } from "./editor"
import { Meta, StoryObj } from "@storybook/react"

const meta = {
    title: "Pages/Editor",
    parameters: {
        layout: "fullscreen",
    },
    component: Editor,
    argTypes: {},
} satisfies Meta<typeof Editor>
export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
    args: {},
}
export const ExistingNote: Story = {
    args: {
        note: {
            blocks: [
                {
                    type: "header",
                    data: {
                        level: 1,
                        text: "You can start writing text here",
                    },
                    id: "1",
                },
            ],
            tags: [],
        },
    },
}
