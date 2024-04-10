import { useEffect, useRef, useState } from "react";
import { type Style } from "~/lib/types/Style";

export function Painting({
	hearts,
	style,
}: Readonly<{ hearts: number; style: Style }>) {
	const fullHeartRef = useRef<HTMLImageElement>(null);
	const halfHeartRef = useRef<HTMLImageElement>(null);
	const emptyHeartRef = useRef<HTMLImageElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [imageSource, setImageSource] = useState("");

	useEffect(() => {
		if (
			!fullHeartRef.current ||
			!halfHeartRef.current ||
			!canvasRef.current ||
			!emptyHeartRef.current
		) {
			return;
		}

		const context = canvasRef.current.getContext("2d");
		if (!context) {
			return;
		}
		const fullHeart = fullHeartRef.current;
		const halfHeart = halfHeartRef.current;

		context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

		const totalHearts = hearts;

		const fullHeartCount = Math.floor(totalHearts);
		const shouldAppendHalfHeart = totalHearts - fullHeartCount > 0;

		for (let index = 0; index < fullHeartCount; index++) {
			context.drawImage(fullHeart, index * 111, 0);
		}
		if (shouldAppendHalfHeart) {
			context.drawImage(halfHeart, fullHeartCount * 111, 0);
		}
		for (
			let index = fullHeartCount + (shouldAppendHalfHeart ? 1 : 0);
			index < 10;
			index++
		) {
			context.drawImage(emptyHeartRef.current, index * 111, 0);
		}

		setImageSource(canvasRef.current.toDataURL());
	}, [hearts, style, setImageSource]);

	return (
		<>
			<div className="hidden">
				<img src={`/full-${style}.png`} alt="full heart" ref={fullHeartRef} />
				<img src={`/half-${style}.png`} alt="half heart" ref={halfHeartRef} />
				<img
					src={`/empty${style === "food" ? "-food" : ""}.png`}
					alt="empty heart"
					ref={emptyHeartRef}
				/>
			</div>
			<canvas
				id="hearts-canvas"
				width="1100"
				height="101"
				className="hidden"
				ref={canvasRef}
			/>
			<img
				src={imageSource}
				alt="hearts"
				className="h-auto w-full max-w-[1100px]"
			/>
		</>
	);
}
