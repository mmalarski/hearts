import { useState } from "react";
import { type Style } from "~/lib/types/Style";
import { Painting } from "./Painting";
import { Slider } from "./ui/slider";

export function Control() {
	const [hearts, setHearts] = useState([5.5]);
	const [style, setStyle] = useState<Style>("default");

	return (
		<>
			<Painting hearts={hearts.at(0) ?? 0} style={style} />
			<Slider max={10} step={0.5} value={hearts} onValueChange={setHearts} />
		</>
	);
}
