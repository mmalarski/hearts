import { useState } from "react";
import { Painting } from "./Painting";
import { Slider } from "./ui/slider";

export function Control() {
	const [hearts, setHearts] = useState([5.5]);

	return (
		<>
			<Painting hearts={hearts.at(0) ?? 0} />
			<Slider max={10} step={0.5} value={hearts} onValueChange={setHearts} />
		</>
	);
}
