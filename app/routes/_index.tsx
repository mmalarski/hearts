import type { MetaFunction } from "@remix-run/node";
import { Control } from "~/components/Control";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
		{ name: "theme-color", content: "#030712" },
	];
};

export default function Index() {
	return (
		<main className="h-screen w-screen bg-slate-950 text-slate-50">
			<section className="mx-auto flex h-full w-[70%] max-w-[800px] flex-col items-center justify-center gap-8">
				<Control />
			</section>
		</main>
	);
}
