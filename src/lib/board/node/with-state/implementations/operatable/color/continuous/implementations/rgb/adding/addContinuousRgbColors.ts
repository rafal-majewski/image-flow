import type {ContinuousRgbColor} from "../ContinuousRgbColor.ts";
export function addContinuousRgbColors(
	color1: ContinuousRgbColor,
	color2: ContinuousRgbColor,
): ContinuousRgbColor {
	return {
		red: color1.red + color2.red,
		green: color1.green + color2.green,
		blue: color1.blue + color2.blue,
	};
}
