import type {ConvolutionOrCorrelationMapperOperatorKernelMultipliers} from "../multipliers/ConvolutionOrCorrelationMapperOperatorKernelMultipliers.ts";
export function rotateMultipliersBy180DegreesClockwise(
	multipliers: ConvolutionOrCorrelationMapperOperatorKernelMultipliers,
): ConvolutionOrCorrelationMapperOperatorKernelMultipliers {
	return multipliers.toReversed().map((row) => {
		return row.toReversed();
	}) as unknown as ConvolutionOrCorrelationMapperOperatorKernelMultipliers;
}
