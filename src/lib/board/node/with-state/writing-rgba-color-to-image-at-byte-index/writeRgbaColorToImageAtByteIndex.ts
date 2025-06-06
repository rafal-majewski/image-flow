import type {DiscreteRgbaColor} from "../implementations/operatable/color/discrete/implementations/rgba/DiscreteRgbaColor.ts";
export function writeRgbaColorToImageAtByteIndex(
	outputImage: ImageData,
	byteIndex: number,
	color: DiscreteRgbaColor,
): void {
	outputImage.data[byteIndex] = color.red;
	outputImage.data[byteIndex + 1] = color.green;
	outputImage.data[byteIndex + 2] = color.blue;
	outputImage.data[byteIndex + 3] = color.alpha;
}
