import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {computeByteIndexFromPosition} from "./computeByteIndexFromPosition.ts";
import type {DiscreteWithAlphaColor} from "./DiscreteWithAlphaColor.ts";
export function writeWithAlphaColorToImageAtByteIndex(
	image: ImageData,
	byteIndex: number,
	color: DiscreteWithAlphaColor,
): void {
	image.data[byteIndex] = color.redComponent;
	image.data[byteIndex + 1] = color.greenComponent;
	image.data[byteIndex + 2] = color.blueComponent;
	image.data[byteIndex + 3] = color.alphaComponent;
}
