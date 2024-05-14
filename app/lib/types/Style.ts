export const styles = [
	"default",
	"poison",
	"freezing",
	"food",
	"custom",
] as const;
export type Style = (typeof styles)[number];
