import { MainHeader } from "@app/components/main-header"
import { Header } from "./main-header"
import { StoryObj, Meta } from "@storybook/react"
import { Tag } from "@app/model/note"

const meta = {
    title: "Components/Main Header",
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    component: Header,
    argTypes: {
        tags: { control: "array", description: "Tags to display", defaultValue: [] },
    },
} satisfies Meta<typeof MainHeader>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        tags: [],
    },
}

export const Tags: Story = {
    args: {
        tags: [new Tag("tag1"), new Tag("tag2")],
        archivedCount: 1,
    },
}
