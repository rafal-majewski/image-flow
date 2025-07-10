import {MapperOperator} from "../../MapperOperator.ts";
import type {RotationApplier} from "./rotation-applier/RotationApplier.ts";
import ConvolutionOrCorrelationMapperOperatorDisplayer from "./displayer/ConvolutionOrCorrelationMapperOperatorDisplayer.svelte";
import {setEachPixelYielding} from "../../../../../operating/operator/setting-each-pixel-yielding/setEachPixelYielding.ts";
import {useConvolutionOrCorrelationMapperOperatorKernel} from "./using-kernel/useConvolutionOrCorrelationMapperOperatorKernel.ts";
import type {ConvolutionOrCorrelationMapperOperatorKernel} from "./kernel/ConvolutionOrCorrelationMapperOperatorKernel.ts";
export class ConvolutionOrCorrelationMapperOperator extends MapperOperator {
	public constructor(
		kernel: ConvolutionOrCorrelationMapperOperatorKernel,
		rotationApplier: RotationApplier,
	) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return ConvolutionOrCorrelationMapperOperatorDisplayer(
					...newParameters,
				);
			},
			"convoluting-or-correlating",
			"Convoluting / Correlating",
		);
		this.kernel = kernel;
		this.rotationApplier = rotationApplier;
	}
	public readonly kernel: ConvolutionOrCorrelationMapperOperatorKernel;
	public override *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const rotatedkernel = this.rotationApplier.applyRotation(this.kernel);
		const outputImage = new ImageData(
			inputImages[0].width - (rotatedkernel.dimensions.width - 1),
			inputImages[0].height - (rotatedkernel.dimensions.height - 1),
		);
		yield* setEachPixelYielding(outputImage, (inOutputImagePosition) => {
			return useConvolutionOrCorrelationMapperOperatorKernel(
				inOutputImagePosition,
				inputImages[0],
				rotatedkernel,
			)
				.withAlphaComponent(1)
				.convertToDiscrete();
		});
		return outputImage;
	}
	public replaceKernel(
		newKernel: ConvolutionOrCorrelationMapperOperatorKernel,
	): ConvolutionOrCorrelationMapperOperator {
		return new ConvolutionOrCorrelationMapperOperator(
			newKernel,
			this.rotationApplier,
		);
	}
	public replaceRotationApplier(
		newRotationApplier: RotationApplier,
	): ConvolutionOrCorrelationMapperOperator {
		return new ConvolutionOrCorrelationMapperOperator(
			this.kernel,
			newRotationApplier,
		);
	}
	public readonly rotationApplier: RotationApplier;
}
