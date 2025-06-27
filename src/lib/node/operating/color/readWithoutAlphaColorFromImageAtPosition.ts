import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {computeByteIndexFromPosition} from "./computeByteIndexFromPosition.ts";
import type {DiscreteWithoutAlphaColor} from "./DiscreteWithoutAlphaColor.ts";
import {readWithoutAlphaColorFromImageAtByteIndex} from "./readWithoutAlphaColorFromImageAtByteIndex.ts";
export function readWithoutAlphaColorFromImageAtPosition(
	image: ImageData,
	position: Coordinates,
): DiscreteWithoutAlphaColor {
	const byteIndex = computeByteIndexFromPosition(position, image.width);
	return readWithoutAlphaColorFromImageAtByteIndex(image, byteIndex);
}
