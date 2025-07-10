export type ErrorDiffusionDitheringMapperOperatorKernelCalculationPolicy =
	| "computeErrorContinuouslyAndSumContinuouslyWithoutClamping"
	| "computeErrorContinuouslyAndSumContinuouslyWithClamping"
	| "computeErrorContinuouslyAndSumDiscretely"
	| "computeErrorDiscretelyAndSumContinuouslyWithoutClamping"
	| "computeErrorDiscretelyAndSumContinuouslyWithClamping"
	| "computeErrorDiscretelyAndSumDiscretely";
