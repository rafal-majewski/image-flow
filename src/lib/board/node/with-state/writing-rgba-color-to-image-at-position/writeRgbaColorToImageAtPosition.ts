import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {DiscreteRgbaColor} from "../implementations/operatable/color/discrete/implementations/rgba/DiscreteRgbaColor.ts";
import {writeRgbaColorToImageAtByteIndex} from "../writing-rgba-color-to-image-at-byte-index/writeRgbaColorToImageAtByteIndex.ts";
export function writeRgbaColorToImageAtPosition(
	outputImage: ImageData,
	position: Coordinates,
	color: DiscreteRgbaColor,
): void {
	const byteIndex = (position.y * outputImage.width + position.x) * 4;
	writeRgbaColorToImageAtByteIndex(outputImage, byteIndex, color);
}
