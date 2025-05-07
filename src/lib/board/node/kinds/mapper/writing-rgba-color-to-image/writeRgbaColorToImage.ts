import type {DiscreteRgbaColor} from "../color/types/discrete/kinds/rgba/DiscreteRgbaColor.ts";
export function writeRgbaColorToImage(
	outputImage: ImageData,
	byteIndex: number,
	color: DiscreteRgbaColor,
): void {
	outputImage.data[byteIndex] = color.red;
	outputImage.data[byteIndex + 1] = color.green;
	outputImage.data[byteIndex + 2] = color.blue;
	outputImage.data[byteIndex + 3] = color.alpha;
}
