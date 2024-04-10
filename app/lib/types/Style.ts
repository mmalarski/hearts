export const styles = ["default", "poison", "freezing", "food"] as const;
export type Style = (typeof styles)[number];
