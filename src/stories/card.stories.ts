import { Card } from "./card"
import { Meta, StoryObj } from "@storybook/react"
import { NoteCard } from "@app/components/note-card"
import { Tag } from "@app/model/note"

const meta = {
    title: "Scratch/NoteCard",
    component: Card,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        date: { control: "date" },
        tags: { control: "array", description: "Tags to display", defaultValue: [] },
        archived: { control: "boolean" },
    },
} satisfies Meta<typeof NoteCard>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        date: new Date(Date.now()),
        archived: false,
        tags: [],
    },
}

export const Tagged: Story = {
    args: {
        date: new Date(Date.now()),
        archived: false,
        tags: [new Tag("tag1"), new Tag("tag2")],
    },
}

export const Archived: Story = {
    args: {
        date: new Date(Date.now()),
        archived: true,
        tags: [],
    },
}
