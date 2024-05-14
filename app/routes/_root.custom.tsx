import {
	unstable_createMemoryUploadHandler,
	unstable_defineAction,
	unstable_parseMultipartFormData,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { resizeFile } from "~/files.server";

export const action = unstable_defineAction(async ({ request, response }) => {
	const formData = await unstable_parseMultipartFormData(
		request,
		unstable_createMemoryUploadHandler(),
	);
	const file = formData.get("custom-icon");

	if (!file) {
		response.status = 400;
		throw response;
	}

	const arrayBuffer = await (file as File).arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	const resizedImage = await resizeFile(buffer, 101, 101);

	return {
		image: {
			data: Buffer.from(resizedImage.data).toString("base64"),
			size: {
				width: Number(resizedImage.metadata.width),
				height: Number(resizedImage.metadata.height),
			},
		},
	};
});

export default function CustomPage() {
	const data = useActionData<typeof action>();

	return (
		<>
			<Form method="post" encType="multipart/form-data">
				<input
					type="file"
					id="custom-icon"
					name="custom-icon"
					accept="image/png, image/jpeg"
				/>
				<button type="submit">Upload</button>
			</Form>
			{data?.image ? (
				<img
					src={`data:image/png;base64,${data.image.data}`}
					width={data.image.size.width}
					height={data.image.size.height}
					alt="Custom icon"
				/>
			) : null}
		</>
	);
}
