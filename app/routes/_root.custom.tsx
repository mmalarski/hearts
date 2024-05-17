import { Button } from "@headlessui/react";
import {
	unstable_createMemoryUploadHandler,
	unstable_defineAction,
	unstable_parseMultipartFormData,
} from "@remix-run/node";
import {
	Form,
	Link,
	useActionData,
	useLoaderData,
	useNavigation,
} from "@remix-run/react";
import {
	defineClientAction,
	defineClientLoader,
} from "@remix-run/react/dist/single-fetch";
import { useSpinDelay } from "spin-delay";
import Dropzone from "~/components/Dropzone";
import { Painting } from "~/components/Painting";
import Spinner from "~/components/Spinner";
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

export const clientAction = defineClientAction(
	async ({ serverAction, request }) => {
		if (request.method === "DELETE") {
			localStorage.removeItem("hearts-custom-icon");
			return null;
		}
		const data = await serverAction<typeof action>();
		localStorage.setItem("hearts-custom-icon", JSON.stringify(data));
		return data;
	},
);

export const clientLoader = defineClientLoader(async () => {
	const data = localStorage.getItem("hearts-custom-icon");
	return data ? JSON.parse(data) : null;
});

export default function CustomPage() {
	const loaderData = useLoaderData<typeof clientLoader>();
	const actionData = useActionData<typeof action>();
	const data = actionData ?? loaderData;
	const navigation = useNavigation();

	const shouldShowDropzone = useSpinDelay(navigation.state === "idle", {
		delay: 150,
		minDuration: 500,
	});

	return (
		<div className="flex w-full max-w-[1100px] flex-col items-center gap-2">
			{shouldShowDropzone ? <Dropzone /> : <Spinner />}
			{data ? (
				<div className="flex flex-col items-center gap-4">
					<Painting
						images={{
							full: data.full.data,
							half: data.half.data,
							empty: data.empty.data,
						}}
						heartSize={data.full.size.height}
					/>
					<Form method="delete" className="mt-5 self-end">
						<Button
							className="w-fit rounded bg-red-900 px-4 py-2 text-sm text-white data-[active]:bg-red-800 data-[hover]:bg-red-800"
							type="submit"
						>
							Delete local image
						</Button>
					</Form>
				</div>
			) : null}
		</div>
	);
}

export function ErrorBoundary() {
	return (
		<div className="items-left flex w-full max-w-[1100px] flex-col gap-4 rounded-lg bg-red-950 p-6 text-gray-200">
			<h1 className="text-2xl font-medium">Hey, an error 😅</h1>
			<p>There was an error processing your image. Sorry about that!</p>
			<p>
				Can&apos;t really tell you what went wrong, but most likely the image
				was too big and the request handler timed out. Or ran out of memory. Or
				something else. Your guess is as good as mine.
			</p>
			<p>You can try again with a smaller image, or just give up. Your call.</p>
			<Button
				as={Link}
				to="/"
				className="w-fit self-center rounded bg-red-400 px-4 py-2 text-sm text-slate-900 data-[active]:bg-red-500 data-[hover]:bg-red-500"
			>
				🔙 Go back home
			</Button>
		</div>
	);
}
