import type {DiscreteColorComponent} from "./DiscreteColorComponent.ts";
import {DiscreteWithoutAlphaColor} from "./DiscreteWithoutAlphaColor.ts";
export function readWithoutAlphaColorFromImageAtByteIndex(
	image: ImageData,
	byteIndex: number,
): DiscreteWithoutAlphaColor {
	return new DiscreteWithoutAlphaColor(
		image.data[byteIndex] as DiscreteColorComponent,
		image.data[byteIndex + 1] as DiscreteColorComponent,
		image.data[byteIndex + 2] as DiscreteColorComponent,
	);
}
