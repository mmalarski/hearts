import { redirect, type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Hearts" },
		{ name: "description", content: "Hearts slider generator" },
		{ name: "theme-color", content: "#030712" },
	];
};

export function loader() {
	return redirect("/default");
}
