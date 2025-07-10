import {Coordinates} from "../../../../../../../coordinates/Coordinates.ts";
import type {ContinuousWithoutAlphaColor} from "../../../../../../operating/color/ContinuousWithoutAlphaColor.ts";
import {ContinuousWithoutAlphaColorBuilder} from "../../../../../../operating/color/ContinuousWithoutAlphaColorBuilder.ts";
import {readWithoutAlphaColorFromImageAtPosition} from "../../../../../../operating/color/readWithoutAlphaColorFromImageAtPosition.ts";
import type {ConvolutionOrCorrelationMapperOperatorKernel} from "../kernel/ConvolutionOrCorrelationMapperOperatorKernel.ts";
export function useConvolutionOrCorrelationMapperOperatorKernel(
	pixelPositionInOutputImage: Coordinates,
	inputImage: ImageData,
	kernel: ConvolutionOrCorrelationMapperOperatorKernel,
): ContinuousWithoutAlphaColor {
	let sum = new ContinuousWithoutAlphaColorBuilder(0, 0, 0);
	for (const {relativeToAnchorPosition, multiplier} of kernel) {
		const pixelPositionInInputImage = pixelPositionInOutputImage.addCoordinates(
			relativeToAnchorPosition,
		);
		const pixelColorInInputImage = readWithoutAlphaColorFromImageAtPosition(
			inputImage,
			pixelPositionInInputImage,
		).convertToContinuous();
		sum = sum.addBuilder(
			pixelColorInInputImage.convertToBuilder().multiplyByScalar(multiplier),
		);
	}
	return sum.build();
}
