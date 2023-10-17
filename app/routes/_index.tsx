import type { MetaFunction } from "@remix-run/node";
import { Control } from "~/components/Control";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	return (
		<main className="h-screen w-screen bg-slate-950 text-slate-50">
			<section className="mx-auto flex h-full w-full max-w-[800px] flex-col items-center justify-center gap-2">
				<h1 className="text-4xl font-bold">Set hearts</h1>
				<Control />
			</section>
		</main>
	);
}
