import { useEffect, useRef } from "react";

export function Painting({ hearts }: { hearts: number }) {
	const fullHeartRef = useRef<HTMLImageElement>(null);
	const halfHeartRef = useRef<HTMLImageElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!fullHeartRef.current || !halfHeartRef.current || !canvasRef.current) {
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
			context.drawImage(fullHeart, index * 101, 0);
		}
		if (shouldAppendHalfHeart) {
			context.drawImage(halfHeart, fullHeartCount * 101, 0);
		}
	}, [hearts]);

	return (
		<>
			<div className="invisible flex gap-2">
				<img src="/full-small.png" alt="full heart" ref={fullHeartRef} />
				<img src="/half-small.png" alt="half heart" ref={halfHeartRef} />
			</div>
			<canvas id="hearts-canvas" width="1010" height="101" ref={canvasRef} />
		</>
	);
}
