import { useState } from "react";
import { styles, type Style } from "~/lib/types/Style";
import { capitalize } from "~/lib/utils";
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
	const [style, setStyle] = useState<Style>("default");

	return (
		<>
			<Painting hearts={hearts.at(0) ?? 0} style={style} />
			<Slider max={10} step={0.5} value={hearts} onValueChange={setHearts} />
			<Select
				value={style}
				onValueChange={(value) => {
					setStyle(value as Style);
				}}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Style" />
				</SelectTrigger>
				<SelectContent>
					{styles.map((style) => (
						<SelectItem key={style} value={style}>
							{capitalize(style)}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</>
	);
}
