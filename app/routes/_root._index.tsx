import { unstable_defineLoader } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Painting } from "~/components/Painting";
import { getImageLoaderData } from "~/files.server";
import { Style } from "~/lib/Styles";
import { filenameMap } from "~/lib/filenameMap";

export const loader = unstable_defineLoader(async ({ request, response }) => {
	const url = new URL(request.url);
	const style = url.searchParams.get("style");

	if (!style) {
		response.status = 302;
		response.headers.set("Location", "/?style=default");
		throw response;
	}

	return getImageLoaderData(filenameMap[style as Style]);
});

export default function DefaultPage() {
	const { halfImage, fullImage, emptyImage } = useLoaderData<typeof loader>();

	return (
		<Painting
			images={{
				full: fullImage.data,
				half: halfImage.data,
				empty: emptyImage.data,
			}}
			heartSize={fullImage.size.width}
		/>
	);
}
