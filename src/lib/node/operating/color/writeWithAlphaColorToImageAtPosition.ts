import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {computeByteIndexFromPosition} from "./computeByteIndexFromPosition.ts";
import type {DiscreteWithAlphaColor} from "./DiscreteWithAlphaColor.ts";
import {writeWithAlphaColorToImageAtByteIndex} from "./writeWithAlphaColorToImageAtByteIndex.ts";
export function writeWithAlphaColorToImageAtPosition(
	image: ImageData,
	position: Coordinates,
	color: DiscreteWithAlphaColor,
): void {
	const byteIndex = computeByteIndexFromPosition(position, image.width);
	writeWithAlphaColorToImageAtByteIndex(image, byteIndex, color);
}
