export enum LAYER_LEVEL {
    LEVEL_1 = 1,
    LEVEL_2 = 2,
    LEVEL_3 = 3,
    LEVEL_4 = 4,
}

const _color_variants = ["primary", "secondary", "tertiary"] as const
export type ColorVariant = (typeof _color_variants)[number]

const _size_variants = ["large", "medium"] as const
export type SizeVariant = (typeof _size_variants)[number]
