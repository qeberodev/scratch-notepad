import { ContainerOutlined, MenuOutlined, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons"
import { Badge, Button, Flex, Input, Space } from "antd"
import { ChangeEventHandler, KeyboardEventHandler, PropsWithChildren, useCallback, useMemo, useState } from "react"
import { container } from "."
import { Tooltip } from "@components/ui/tooltip"
import { Tag as TagModel } from "@app/model/note"
import { Tag } from "@components/ui/tag"

type SearchInputProps = { value?: string; onChange?: (val: string) => void; onSearch?: (value: string) => void }
function SearchInput(props: SearchInputProps) {
    const { onSearch, value, onChange } = props

    const handleSearch: KeyboardEventHandler<HTMLInputElement> = useCallback(
        ({ currentTarget: { value: v } }) => onSearch && onSearch(v),
        [onSearch],
    )
    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        ({ currentTarget: { value: v } }) => onChange && onChange(v),
        [onChange],
    )

    return (
        <Input
            value={value}
            allowClear={true}
            placeholder="Search"
            onChange={handleChange}
            onPressEnter={handleSearch}
        />
    )
}
type RightToolbarProps = Pick<SearchInputProps, "value" | "onChange" | "onSearch"> & {
    archivedCount?: number
    onSidepanelOpen?: () => void
}
function RightToolbar(props: RightToolbarProps) {
    const { onChange, onSearch, value, archivedCount, onSidepanelOpen: onSettingsOpen } = props
    const [showSearch, setShowSearch] = useState(false)
    const isEmpty = useCallback((val?: string): val is undefined => !val || val.length === 0, [value])

    const handleClick = useCallback(() => {
        /* if the search input is empty, then toggle the search input */
        if (isEmpty(value) || !showSearch) {
            setShowSearch(!showSearch)
        } else {
            onSearch && onSearch(value)
        }
    }, [value, showSearch, isEmpty, onSearch])

    return (
        <Space>
            {showSearch && <SearchInput onSearch={onSearch} value={value} onChange={onChange} />}
            <Tooltip title="Search" mouseEnterDelay={2}>
                <Button icon={<SearchOutlined />} type="text" onClick={handleClick} />
            </Tooltip>
            <Tooltip title="Open Archive" mouseEnterDelay={2}>
                <Button
                    type="text"
                    icon={
                        <Badge dot count={archivedCount} size="small">
                            <ContainerOutlined />
                        </Badge>
                    }
                />
            </Tooltip>
            <Tooltip title="Open Sidepanel" mouseEnterDelay={2}>
                <Button type="text" icon={<MenuOutlined />} onClick={onSettingsOpen} />
            </Tooltip>
        </Space>
    )
}

type LeftToolbarProps = { onNew?: () => void }
function LeftToolbar(props: LeftToolbarProps) {
    const { onNew } = props

    return (
        <Space>
            <Tooltip title="Create Note" mouseEnterDelay={2}>
                <Button icon={<PlusCircleOutlined />} type="text" onClick={onNew} />
            </Tooltip>
        </Space>
    )
}

export type MainHeaderProps = Pick<SearchInputProps, "value" | "onChange" | "onSearch"> &
    Pick<RightToolbarProps, "onSidepanelOpen"> &
    LeftToolbarProps & {
        tags?: TagModel[]
        onTagSelect?: (tag: TagModel) => void
        archivedCount?: number
    }
export function MainHeader(props: PropsWithChildren<MainHeaderProps>) {
    const { onChange, onSearch, value, onNew, tags, onTagSelect, onSidepanelOpen: onSettingsOpen } = props
    const archivedCount = useMemo(() => props.archivedCount ?? 0, [props.archivedCount])

    return (
        <Flex className={container} gap={"small"} justify="space-between" align="center">
            <LeftToolbar onNew={onNew} />

            <Flex justify="space-between" align="center" flex={1}>
                <span
                    style={{
                        padding: "4px 0",
                        height: 22,
                    }}
                >
                    {tags &&
                        tags.map((tag) => <Tag clickable onClick={() => onTagSelect?.(tag)} key={tag.id} tag={tag} />)}
                </span>
                <RightToolbar
                    onSidepanelOpen={onSettingsOpen}
                    archivedCount={archivedCount}
                    onSearch={onSearch}
                    onChange={onChange}
                    value={value}
                />
            </Flex>
        </Flex>
    )
}
