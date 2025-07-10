import {MapperOperator} from "../../MapperOperator.ts";
import {readWithAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithAlphaColorFromImageAtPosition.ts";
import ErosionMapperOperatorDisplayer from "./displayer/ErosionMapperOperatorDisplayer.svelte";
import type {ErosionMapperOperatorKernel} from "./kernel/ErosionMapperOperatorKernel.ts";
import {mapEachPixelYielding} from "../../../../../operating/operator/mapping-each-pixel-yielding/mapEachPixelYielding.ts";
import type {ErosionMapperOperatorColorComponentPolicy} from "./color-component-policy/ErosionMapperOperatorColorComponentPolicy.ts";
export class ErosionMapperOperator extends MapperOperator {
	public constructor(
		colorComponentPolicy: ErosionMapperOperatorColorComponentPolicy,
		kernel: ErosionMapperOperatorKernel,
	) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return ErosionMapperOperatorDisplayer(...newParameters);
			},
			"erosion",
			"Erosion",
		);
		this.colorComponentPolicy = colorComponentPolicy;
		this.kernel = kernel;
	}
	public readonly colorComponentPolicy: ErosionMapperOperatorColorComponentPolicy;
	public readonly kernel: ErosionMapperOperatorKernel;
	public *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			new Uint8ClampedArray(inputImages[0].data),
			inputImages[0].width,
			inputImages[0].height,
		);
		yield* mapEachPixelYielding(
			outputImage,
			(originalColor, pixelPositionInOutputImage) => {
				let minimalColor = originalColor.convertToContinuous();
				switch (this.colorComponentPolicy) {
					case "sum": {
						let minimalColorComponentsSum = minimalColor.computeComponentsSum();
						for (const {relativeToAnchorPosition} of this.kernel) {
							const pixelPositionInInputImage =
								pixelPositionInOutputImage.addCoordinates(
									relativeToAnchorPosition,
								);
							const pixelColorInInputImage =
								readWithAlphaColorFromImageAtPosition(
									inputImages[0],
									pixelPositionInInputImage,
								).convertToContinuous();
							const pixelColorInInputImageComponentsSum =
								pixelColorInInputImage.computeComponentsSum();
							if (
								pixelColorInInputImageComponentsSum < minimalColorComponentsSum
							) {
								minimalColor = pixelColorInInputImage;
								minimalColorComponentsSum = pixelColorInInputImageComponentsSum;
							}
						}
						break;
					}
					case "separate": {
						for (const {relativeToAnchorPosition} of this.kernel) {
							const pixelPositionInInputImage =
								pixelPositionInOutputImage.addCoordinates(
									relativeToAnchorPosition,
								);
							const pixelColorInInputImage =
								readWithAlphaColorFromImageAtPosition(
									inputImages[0],
									pixelPositionInInputImage,
								).convertToContinuous();
							if (
								pixelColorInInputImage.redComponent < minimalColor.redComponent
							) {
								minimalColor = minimalColor.replaceRedComponent(
									pixelColorInInputImage.redComponent,
								);
							}
							if (
								pixelColorInInputImage.greenComponent
								< minimalColor.greenComponent
							) {
								minimalColor = minimalColor.replaceGreenComponent(
									pixelColorInInputImage.greenComponent,
								);
							}
							if (
								pixelColorInInputImage.blueComponent
								< minimalColor.blueComponent
							) {
								minimalColor = minimalColor.replaceBlueComponent(
									pixelColorInInputImage.blueComponent,
								);
							}
							if (
								pixelColorInInputImage.alphaComponent
								< minimalColor.alphaComponent
							) {
								minimalColor = minimalColor.replaceAlphaComponent(
									pixelColorInInputImage.alphaComponent,
								);
							}
						}
						break;
					}
				}
				return minimalColor.convertToDiscrete();
			},
		);
		return outputImage;
	}
	public replaceColorComponentPolicy(
		newColorComponentPolicy: ErosionMapperOperatorColorComponentPolicy,
	): ErosionMapperOperator {
		return new ErosionMapperOperator(newColorComponentPolicy, this.kernel);
	}
	public replaceKernel(
		newKernel: ErosionMapperOperatorKernel,
	): ErosionMapperOperator {
		return new ErosionMapperOperator(this.colorComponentPolicy, newKernel);
	}
}
