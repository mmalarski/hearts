import {
	json,
	type LoaderFunctionArgs,
	type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Control } from "~/components/Control";

export const meta: MetaFunction = () => {
	return [
		{ title: "Hearts" },
		{ name: "description", content: "Hearts slider generator" },
		{ name: "theme-color", content: "#030712" },
	];
};

export function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	// eslint-disable-next-line eqeqeq
	const isCursorEventEnabled = url.searchParams.get("cursor") != null;
	return json({ isCursorEventEnabled });
}

export default function Index() {
	const { isCursorEventEnabled } = useLoaderData<typeof loader>();

	return (
		<main className="h-screen w-screen bg-slate-950 text-slate-50">
			{isCursorEventEnabled ? (
				<script
					type="module"
					defer
					dangerouslySetInnerHTML={{
						__html: `import {ghostCursor} from "https://unpkg.com/cursor-effects@latest/dist/esm.js";
					new ghostCursor();`,
					}}
				/>
			) : null}
			<section className="mx-auto flex h-full w-[70%] max-w-[800px] flex-col items-center justify-center gap-8">
				<Control />
			</section>
		</main>
	);
}
