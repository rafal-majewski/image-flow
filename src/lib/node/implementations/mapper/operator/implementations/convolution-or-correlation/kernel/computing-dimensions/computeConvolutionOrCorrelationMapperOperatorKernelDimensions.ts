import {Dimensions} from "../../../../../../../../dimensions/Dimensions.ts";
import type {ConvolutionOrCorrelationMapperOperatorKernelMultipliers} from "../multipliers/ConvolutionOrCorrelationMapperOperatorKernelMultipliers.ts";
export function computeConvolutionOrCorrelationMapperOperatorKernelDimensions(
	multipliers: ConvolutionOrCorrelationMapperOperatorKernelMultipliers,
): Dimensions {
	return new Dimensions(multipliers[0].length, multipliers.length);
}
