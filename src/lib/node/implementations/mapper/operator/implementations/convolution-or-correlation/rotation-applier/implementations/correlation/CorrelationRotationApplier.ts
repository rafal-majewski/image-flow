import type {ConvolutionOrCorrelationMapperOperatorKernel} from "../../../kernel/ConvolutionOrCorrelationMapperOperatorKernel.ts";
import {RotationApplier} from "../../RotationApplier.ts";
export class CorrelationRotationApplier extends RotationApplier {
	public constructor() {
		super("correlation", "Correlation");
	}
	public override applyRotation(
		kernel: ConvolutionOrCorrelationMapperOperatorKernel,
	): ConvolutionOrCorrelationMapperOperatorKernel {
		return kernel;
	}
}
