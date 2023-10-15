import { Theme } from "@app/model/settings"
import { Button, Drawer, DrawerProps, Flex, Popconfirm, Space, theme as _theme } from "antd"
import { useState } from "react"
import { container } from "."
import { InfoCircleFilled, LeftCircleOutlined } from "@ant-design/icons"
import { red } from "@ant-design/colors"

const pages = ["privacy", "general", "about"] as const
type Page = (typeof pages)[number]

type GeneralPageProps = DrawerProps & {
    theme: Theme
    onThemeChange?: (theme: Theme) => void
}
type PrivacyPageProps = DrawerProps & {
    onClearData?: () => void
}
type AboutPageProps = DrawerProps & {}

const GeneralPage = ({ onThemeChange, theme, ...props }: GeneralPageProps) => (
    <Drawer
        {...props}
        closable={false}
        title={
            <Button icon={<LeftCircleOutlined />} onClick={props.onClose} size="small">
                Go Back
            </Button>
        }
    >
        <Space>
            <Button onClick={() => onThemeChange?.("light")}>Light</Button>
            <Button onClick={() => onThemeChange?.("dark")}>Dark</Button>
        </Space>
    </Drawer>
)
const PrivacyPage = ({ ...props }: PrivacyPageProps) => {
    const { onClearData } = props

    return (
        <Drawer
            {...props}
            closable={false}
            title={
                <Button icon={<LeftCircleOutlined />} onClick={props.onClose} size="small">
                    Go Back
                </Button>
            }
        >
            <Flex vertical gap={"small"}>
                <span style={{ fontSize: "large" }}>Privacy</span>
                <span>
                    We respect your right to privacy and give you the ability to control your data. Our Data Clear
                    functionality allows you to:
                </span>
                <ul>
                    <li>
                        <b>Clear Personal Data: </b> Remove all personal data, including profile information,
                        preferences, and account settings.
                    </li>

                    <li>
                        <b>Delete User Content:</b> Erase all user-generated content such as notes, scratch boards, and
                        uploaded files.
                    </li>
                </ul>

                <Popconfirm
                    onConfirm={onClearData}
                    icon={<InfoCircleFilled style={{ color: red.primary }} />}
                    okButtonProps={{ danger: true }}
                    placement="topLeft"
                    title="You're about to clear personal data?"
                >
                    <Button danger>Clear Personal Data</Button>
                </Popconfirm>
            </Flex>
        </Drawer>
    )
}
const AboutPage = ({ ...props }: AboutPageProps) => (
    <Drawer
        {...props}
        closable={false}
        title={
            <Button icon={<LeftCircleOutlined />} onClick={props.onClose} size="small">
                Go Back
            </Button>
        }
    >
        About
    </Drawer>
)

export type SidePanelProps = DrawerProps & GeneralPageProps & AboutPageProps & PrivacyPageProps & {}
export function SidePanel(props: SidePanelProps) {
    const { token } = _theme.useToken()
    const [activePage, setActivePage] = useState<Page>()

    const { theme, onThemeChange, onClearData, ...rest } = props

    return (
        <Drawer
            {...rest}
            width={520}
            className={container}
            closable={false}
            footer={
                <Flex justify="space-between">
                    <span
                        style={{
                            fontSize: "small",
                            color: token.colorTextQuaternary,
                        }}
                    >
                        <i>
                            <b>Scratch Notes</b>
                        </i>
                    </span>
                    <span
                        style={{
                            fontSize: "small",
                            color: token.colorTextQuaternary,
                            userSelect: "none",
                        }}
                    >
                        powered by <b>Qebero.dev</b>
                    </span>
                </Flex>
            }
        >
            <Flex vertical gap={"small"}>
                <Button size="large" style={{ textAlign: "left" }} block onClick={() => setActivePage("general")}>
                    General
                </Button>
                <Button size="large" style={{ textAlign: "left" }} block onClick={() => setActivePage("privacy")}>
                    Privacy
                </Button>
                <Button size="large" style={{ textAlign: "left" }} block onClick={() => setActivePage("about")}>
                    About
                </Button>
            </Flex>

            {/* General Settings */}
            <GeneralPage
                theme={theme}
                open={activePage === "general"}
                onClose={() => setActivePage(undefined)}
                onThemeChange={onThemeChange}
            />
            <PrivacyPage
                onClearData={onClearData}
                open={activePage === "privacy"}
                onClose={() => setActivePage(undefined)}
            />
            <AboutPage open={activePage === "about"} onClose={() => setActivePage(undefined)} />
        </Drawer>
    )
}
