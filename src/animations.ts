import { AnimationConfig, easings } from "@react-spring/web"

export const animationConfig: Partial<AnimationConfig> = {
    tension: 170,
    friction: 14,
    bounce: 0,
    easing: easings.easeInOutCirc,
    duration: 120,
}
