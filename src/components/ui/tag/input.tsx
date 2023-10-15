import { PlusOutlined } from "@ant-design/icons"
import { Tag, Input, InputRef, theme } from "antd"
import { useRef, useState } from "react"
import { Tag as TagModel } from "@app/model/note"

type TagInputProps = {
    onConfirm?: (tag: TagModel) => void
}
export function TagInput(props: TagInputProps) {
    const { onConfirm } = props
    const { token } = theme.useToken()
    const [inputVisible, setInputVisible] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const inputRef = useRef<InputRef>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    /** handles when input is confirmed */
    const handleInputConfirm = () => {
        if (inputValue && onConfirm) onConfirm(new TagModel(inputValue))
        setInputVisible(false)
        setInputValue("")
    }

    const showInput = () => {
        setInputVisible(true)
    }
    const tagPlusStyle: React.CSSProperties = {
        cursor: "pointer",
        background: token.colorBgContainer,
        borderStyle: "dashed",
    }

    return inputVisible ? (
        <Input
            ref={inputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
            autoFocus={true}
        />
    ) : (
        <Tag onClick={showInput} style={tagPlusStyle}>
            <PlusOutlined /> New Tag
        </Tag>
    )
}
