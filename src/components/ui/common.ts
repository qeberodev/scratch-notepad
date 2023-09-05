export enum LAYER_LEVEL {
    LEVEL_1 = 1,
    LEVEL_2 = 2,
    LEVEL_3 = 3,
    LEVEL_4 = 4,
}

const _variants = ["primary", "secondary", "tertiary"] as const
export type Variant = (typeof _variants)[number]
