import type {ConvolutionOrCorrelationMapperOperatorKernel} from "../kernel/ConvolutionOrCorrelationMapperOperatorKernel.ts";
export abstract class RotationApplier {
	protected constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
	public abstract applyRotation(
		kernel: ConvolutionOrCorrelationMapperOperatorKernel,
	): ConvolutionOrCorrelationMapperOperatorKernel;
	public readonly id: string;
	public readonly name: string;
}
