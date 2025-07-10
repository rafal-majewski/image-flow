import {Dimensions} from "../../../../../../../../dimensions/Dimensions.ts";
import type {ErosionMapperOperatorKernelCoefficients} from "../coefficients/ErosionMapperOperatorKernelCoefficients.ts";
export function computeErosionMapperOperatorKernelDimensions(
	coefficients: ErosionMapperOperatorKernelCoefficients,
): Dimensions {
	return new Dimensions(coefficients[0].length, coefficients.length);
}
