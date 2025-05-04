import type {RgbColor} from "../../../../../../../../../color/RgbColor.ts";
export function computeGrayness(color: RgbColor): number {
	return color.red * 0.3 + color.green * 0.59 + color.blue * 0.11;
}
