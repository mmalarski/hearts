import { useState } from "react";
import { Painting } from "./Painting";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";

export function Control() {
	const [hearts, setHearts] = useState([5.5]);
	const [style, setStyle] = useState<"default" | "poison">("default");

	return (
		<>
			<Painting hearts={hearts.at(0) ?? 0} style={style} />
			<Slider max={10} step={0.5} value={hearts} onValueChange={setHearts} />
			<Select
				value={style}
				onValueChange={(value) => {
					setStyle(value as "default" | "poison");
				}}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Style" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="default">Default</SelectItem>
					<SelectItem value="poison">Poisoned</SelectItem>
				</SelectContent>
			</Select>
		</>
	);
}
