import { useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { Slider } from "./slider";

type PaintingProps = {
	images: {
		full: string;
		half: string;
		empty: string;
	};
	heartSize: number;
};

export function Painting({ images, heartSize }: PaintingProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const paddedSize = heartSize + 10;
	const [imageSource, setImageSource] = useState("");
	const [hearts, setHearts] = useState([5.5]);
	const navigation = useNavigation();

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}

		const context = canvasRef.current.getContext("2d");
		if (!context) {
			return;
		}

		if (navigation.state !== "idle") {
			return;
		}

		context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

		const totalHearts = hearts[0];

		const fullHeartCount = Math.floor(totalHearts);
		const shouldAppendHalfHeart = totalHearts - fullHeartCount > 0;

		const fullHeart = new Image();
		fullHeart.onload = () => {
			for (let index = 0; index < fullHeartCount; index++) {
				context.drawImage(fullHeart, index * paddedSize, 0);
			}
		};
		fullHeart.src = `data:image/png;base64,${images.full}`;

		if (shouldAppendHalfHeart) {
			const halfHeart = new Image();
			halfHeart.onload = () => {
				context.drawImage(halfHeart, fullHeartCount * paddedSize, 0);
			};
			halfHeart.src = `data:image/png;base64,${images.half}`;
		}

		const emptyHeart = new Image();
		emptyHeart.onload = () => {
			for (
				let index = fullHeartCount + (shouldAppendHalfHeart ? 1 : 0);
				index < 10;
				index++
			) {
				context.drawImage(emptyHeart, index * paddedSize, 0);
			}
			setImageSource(canvasRef.current?.toDataURL() ?? "");
		};
		emptyHeart.src = `data:image/png;base64,${images.empty}`;
	}, [hearts, images, setImageSource, paddedSize, navigation.state]);

	return (
		<>
			<canvas
				id="hearts-canvas"
				width={paddedSize * 10}
				height={heartSize}
				className="hidden"
				ref={canvasRef}
			/>
			<img
				src={imageSource}
				width={paddedSize * 10}
				height={heartSize}
				alt="hearts"
				className="h-auto w-full max-w-[1100px]"
			/>
			<Slider max={10} step={0.5} value={hearts} onValueChange={setHearts} />
		</>
	);
}
