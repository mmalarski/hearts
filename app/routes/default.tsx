import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { readFileSync } from "node:fs";
import sharp from "sharp";
import { Control } from "~/components/Control";

export async function loader() {
	const isVercel = process.env.VERCEL === "1" || false;
	const filePath = isVercel
		? // eslint-disable-next-line unicorn/prefer-module
		  `${__dirname}/../../public/half-default.png`
		: "./public/half-default.png";
	const file = readFileSync(filePath);

	const { data } = await sharp(file)
		.resize(111, 111)
		.raw()
		.toBuffer({ resolveWithObject: true });

	const pixelArray = new Uint8ClampedArray(data.buffer);

	return json({
		imageHalf: pixelArray.toString(),
	});
}

export default function DefaultPage() {
	const data = useLoaderData<typeof loader>();

	return (
		<>
			<div>{data.imageHalf}</div>
			<Control />
		</>
	);
}
