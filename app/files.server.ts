import { readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * Retrieves the public file path for a given original path.
 * We need to do this for Vercel, otherwise it won't find the file.
 *
 * @param {string} originalPath - The original path of the file.
 * @return {string} The resolved public file path.
 */
function getPublicFilePath(originalPath: string): string {
	const replacedPath = originalPath.replace("./public/", "");
	return path.resolve("./public", replacedPath);
}

export async function readFile(fileName: string) {
	const file = readFileSync(getPublicFilePath(`${fileName}.png`));

	return {
		data: file,
		metadata: await sharp(file).metadata(),
	};
}

export async function resizeFile(file: Buffer, width: number, height: number) {
	const { data, info } = await sharp(file)
		.resize(width, height)
		.toBuffer({ resolveWithObject: true });

	return {
		data: data,
		metadata: info,
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
