import type {DiscreteRgbColor} from "../DiscreteRgbColor.ts";
export function multiplyDiscreteRgbColor(
	color: DiscreteRgbColor,
	component: number,
): DiscreteRgbColor {
	return {
		red: color.red * component,
		green: color.green * component,
		blue: color.blue * component,
	};
}
