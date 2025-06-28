import {setEachPixel} from "../../../../../operator/setting-each-pixel/setEachPixel.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import type {Kernel} from "./kernel/Kernel.ts";
import type {RotationApplier} from "./rotation-applier/RotationApplier.ts";
import {useKernel} from "./using-kernel/useKernel.ts";
import ConvolutingOrCorrelatingMapperOperatorDisplayer from "./displayer/ConvolutingOrCorrelatingMapperOperatorDisplayer.svelte";
export class ConvolutingOrCorrelatingMapperOperator extends MapperOperator {
	public constructor(kernel: Kernel, rotationApplier: RotationApplier) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return ConvolutingOrCorrelatingMapperOperatorDisplayer(
					...newParameters,
				);
			},
			"convoluting-or-correlating",
			"Convoluting / Correlating",
		);
		this.kernel = kernel;
		this.rotationApplier = rotationApplier;
	}
	public readonly kernel: Kernel;
	public override *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const rotatedkernel = this.rotationApplier.applyRotation(this.kernel);
		const outputImage = new ImageData(
			inputImages[0].width - (rotatedkernel.dimensions.width - 1),
			inputImages[0].height - (rotatedkernel.dimensions.height - 1),
		);
		yield* setEachPixel(outputImage, (inOutputImagePosition) => {
			return useKernel(inOutputImagePosition, inputImages[0], rotatedkernel)
				.withAlphaComponent(1)
				.convertToDiscrete();
		});
		return outputImage;
	}
	public readonly rotationApplier: RotationApplier;
	public withNewKernel(
		newKernel: Kernel,
	): ConvolutingOrCorrelatingMapperOperator {
		return new ConvolutingOrCorrelatingMapperOperator(
			newKernel,
			this.rotationApplier,
		);
	}
	public withNewRotationApplier(
		newRotationApplier: RotationApplier,
	): ConvolutingOrCorrelatingMapperOperator {
		return new ConvolutingOrCorrelatingMapperOperator(
			this.kernel,
			newRotationApplier,
		);
	}
}
