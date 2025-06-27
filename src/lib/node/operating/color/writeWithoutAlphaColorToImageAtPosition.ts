import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {computeByteIndexFromPosition} from "./computeByteIndexFromPosition.ts";
import type {DiscreteWithoutAlphaColor} from "./DiscreteWithoutAlphaColor.ts";
import {writeWithoutAlphaColorToImageAtByteIndex} from "./writeWithoutAlphaColorToImageAtByteIndex.ts";
export function writeWithoutAlphaColorToImageAtPosition(
	image: ImageData,
	position: Coordinates,
	color: DiscreteWithoutAlphaColor,
): void {
	const byteIndex = computeByteIndexFromPosition(position, image.width);
	writeWithoutAlphaColorToImageAtByteIndex(image, byteIndex, color);
}
