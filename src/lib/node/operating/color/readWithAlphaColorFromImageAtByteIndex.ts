import type {DiscreteColorComponent} from "./DiscreteColorComponent.ts";
import {DiscreteWithAlphaColor} from "./DiscreteWithAlphaColor.ts";
export function readWithAlphaColorFromImageAtByteIndex(
	image: ImageData,
	byteIndex: number,
): DiscreteWithAlphaColor {
	return new DiscreteWithAlphaColor(
		image.data[byteIndex] as DiscreteColorComponent,
		image.data[byteIndex + 1] as DiscreteColorComponent,
		image.data[byteIndex + 2] as DiscreteColorComponent,
		image.data[byteIndex + 3] as DiscreteColorComponent,
	);
}
