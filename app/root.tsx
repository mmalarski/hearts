import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
	useNavigate,
} from "@remix-run/react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./components/ui/select";
import globalStyles from "./globals.css";
import { styles } from "./lib/types/Style";
import { capitalize } from "./lib/utils";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: globalStyles },
	...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<main className="h-screen w-screen bg-slate-950 text-slate-50">
					<section className="mx-auto flex h-full w-[70%] max-w-[800px] flex-col items-center justify-center gap-8">
						<Outlet />
						<Select
							value={pathname.replace("/", "")}
							onValueChange={(value) => {
								navigate(`/${value}`);
							}}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Style" />
							</SelectTrigger>
							<SelectContent>
								{styles.map((style) => (
									<SelectItem key={style} value={style}>
										{capitalize(style)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</section>
				</main>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
