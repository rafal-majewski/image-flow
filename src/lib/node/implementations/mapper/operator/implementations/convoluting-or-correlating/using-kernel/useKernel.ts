import {Coordinates} from "../../../../../../../coordinates/Coordinates.ts";
import type {ContinuousWithoutAlphaColor} from "../../../../../../operating/color/ContinuousWithoutAlphaColor.ts";
import {ContinuousWithoutAlphaColorBuilder} from "../../../../../../operating/color/ContinuousWithoutAlphaColorBuilder.ts";
import {readWithoutAlphaColorFromImageAtPosition} from "../../../../../../operating/color/readWithoutAlphaColorFromImageAtPosition.ts";
import type {Kernel} from "../kernel/Kernel.ts";
export function useKernel(
	inOutputImagePosition: Coordinates,
	inputImage: ImageData,
	kernel: Kernel,
): ContinuousWithoutAlphaColor {
	let sum = new ContinuousWithoutAlphaColorBuilder(0, 0, 0);
	for (const {relativeToAnchorPosition, multiplier} of kernel) {
		const inInputImagePosition = inOutputImagePosition.add(
			relativeToAnchorPosition,
		);
		const inInputImageColor = readWithoutAlphaColorFromImageAtPosition(
			inputImage,
			inInputImagePosition,
		).convertToContinuous();
		sum = sum.addBuilder(
			inInputImageColor.convertToBuilder().multiplyBy(multiplier),
		);
	}
	return sum.build();
}
