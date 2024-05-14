export const STYLES = ["default", "poison", "freezing", "food"] as const;
export type Style = (typeof STYLES)[number];
