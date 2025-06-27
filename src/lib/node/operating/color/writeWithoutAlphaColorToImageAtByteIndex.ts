import type {DiscreteWithoutAlphaColor} from "./DiscreteWithoutAlphaColor.ts";
export function writeWithoutAlphaColorToImageAtByteIndex(
	image: ImageData,
	byteIndex: number,
	color: DiscreteWithoutAlphaColor,
): void {
	image.data[byteIndex] = color.redComponent;
	image.data[byteIndex + 1] = color.greenComponent;
	image.data[byteIndex + 2] = color.blueComponent;
}
