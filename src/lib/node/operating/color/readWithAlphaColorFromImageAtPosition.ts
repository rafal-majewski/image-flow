import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {computeByteIndexFromPosition} from "./computeByteIndexFromPosition.ts";
import {DiscreteWithAlphaColor} from "./DiscreteWithAlphaColor.ts";
import {readWithAlphaColorFromImageAtByteIndex} from "./readWithAlphaColorFromImageAtByteIndex.ts";
export function readWithAlphaColorFromImageAtPosition(
	image: ImageData,
	position: Coordinates,
): DiscreteWithAlphaColor {
	const byteIndex = computeByteIndexFromPosition(position, image.width);
	return readWithAlphaColorFromImageAtByteIndex(image, byteIndex);
}
