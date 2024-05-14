import { readFileSync } from "node:fs";
import sharp from "sharp";

export async function readFile(fileName: string) {
	const isVercel = process.env.VERCEL === "1" || false;
	const filePath = isVercel
		? `${__dirname}/../../public/${fileName}.png`
		: `./public/${fileName}.png`;
	const file = readFileSync(filePath);

	return {
		data: file,
		metadata: await sharp(file).metadata(),
	};
}

export async function resizeFile(file: Buffer, width: number, height: number) {
	const image = sharp(file);

	return {
		data: await image.resize(width, height).toBuffer(),
		metadata: await image.metadata(),
	};
}

type GetLoaderDataParams = {
	fullImageFilename: string;
	halfImageFilename: string;
	emptyImageFilename: string;
};

export async function getImageLoaderData({
	fullImageFilename,
	halfImageFilename,
	emptyImageFilename,
}: GetLoaderDataParams) {
	const halfImage = await readFile(halfImageFilename);
	const fullImage = await readFile(fullImageFilename);
	const emptyImage = await readFile(emptyImageFilename);

	return {
		halfImage: {
			data: Buffer.from(halfImage.data).toString("base64"),
			size: {
				width: Number(halfImage.metadata.width),
				height: Number(halfImage.metadata.height),
			},
		},
		fullImage: {
			data: Buffer.from(fullImage.data).toString("base64"),
			size: {
				width: Number(fullImage.metadata.width),
				height: Number(fullImage.metadata.height),
			},
		},
		emptyImage: {
			data: Buffer.from(emptyImage.data).toString("base64"),
			size: {
				width: Number(emptyImage.metadata.width),
				height: Number(emptyImage.metadata.height),
			},
		},
	};
}
