import type {RgbaColor} from "../../../../../../../../color/RgbaColor.ts";
import {computeGrayness} from "./computing-grayness/computeGrayness.ts";
export function convertColorToGrayscaleColor(color: RgbaColor): RgbaColor {
	const grayness = computeGrayness(color);
	return {red: grayness, green: grayness, blue: grayness, alpha: color.alpha};
}
