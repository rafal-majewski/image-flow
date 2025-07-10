import type {ConvolutionOrCorrelationMapperOperatorKernel} from "../../../kernel/ConvolutionOrCorrelationMapperOperatorKernel.ts";
import {RotationApplier} from "../../RotationApplier.ts";
export class ConvolutionRotationApplier extends RotationApplier {
	public constructor() {
		super("convolution", "Convolution");
	}
	public override applyRotation(
		kernel: ConvolutionOrCorrelationMapperOperatorKernel,
	): ConvolutionOrCorrelationMapperOperatorKernel {
		return kernel.rotateBy180DegreesClockwise();
	}
}
