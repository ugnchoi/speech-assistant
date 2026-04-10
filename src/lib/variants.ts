export const VARIANTS = ["default", "experiment"] as const;

export type VariantId = (typeof VARIANTS)[number];
