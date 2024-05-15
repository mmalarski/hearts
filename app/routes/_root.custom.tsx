import { Button } from "@headlessui/react";
import {
	unstable_createMemoryUploadHandler,
	unstable_defineAction,
	unstable_parseMultipartFormData,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Painting } from "~/components/Painting";
import { createRemainingStates, resizeFile } from "~/files.server";

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

	const { half, empty } = await createRemainingStates({
		file: resizedImage.data,
		metadata: resizedImage.metadata,
	});

	return {
		full: {
			data: Buffer.from(resizedImage.data).toString("base64"),
			size: {
				width: Number(resizedImage.metadata.width),
				height: Number(resizedImage.metadata.height),
			},
		},
		half: {
			data: Buffer.from(half.data).toString("base64"),
			size: {
				width: Number(half.metadata.width),
				height: Number(half.metadata.height),
			},
		},
		empty: {
			data: Buffer.from(empty.data).toString("base64"),
			size: {
				width: Number(empty.metadata.width),
				height: Number(empty.metadata.height),
			},
		},
	};
});

export default function CustomPage() {
	const data = useActionData<typeof action>();

	return (
		<div className="flex flex-col items-center gap-2">
			<Form
				method="post"
				encType="multipart/form-data"
				className="flex flex-col items-center gap-4"
			>
				<input
					type="file"
					id="custom-icon"
					name="custom-icon"
					accept="image/png, image/jpeg"
					required
				/>
				<Button
					className="data-[active]:bg-sky-slate-800 w-fit rounded bg-slate-900 px-4 py-2 text-sm text-white data-[hover]:bg-slate-800"
					type="submit"
				>
					Submit
				</Button>
			</Form>
			{data ? (
				<div className="flex flex-col gap-4">
					<Painting
						images={{
							full: data.full.data,
							half: data.half.data,
							empty: data.empty.data,
						}}
						heartSize={data.full.size.height}
					/>
				</div>
			) : null}
		</div>
	);
}
