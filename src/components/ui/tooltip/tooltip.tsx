import { TooltipProps, Tooltip as T } from "antd"
import { gray } from "@ant-design/colors"

export function Tooltip(props: TooltipProps) {
    return <T color={gray[4]} {...props} />
}
