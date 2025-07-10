import {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {ContinuousWithAlphaColorBuilder} from "../../../../../operating/color/ContinuousWithAlphaColorBuilder.ts";
import {readWithAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithAlphaColorFromImageAtPosition.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import ErrorDiffusionDitheringMapperOperatorDisplayer from "./displayer/ErrorDiffusionDitheringMapperOperatorDisplayer.svelte";
import type {ErrorDiffusionDitheringMapperOperatorKernel} from "./kernel/ErrorDiffusionDitheringMapperOperatorKernel.ts";
import type {ErrorDiffusionDitheringMapperOperatorKernelCalculationPolicy} from "./saving-each-calculation-result-policy/ErrorDiffusionDitheringMapperOperatorKernelCalculationPolicy.ts";
import {writeWithAlphaColorToImageAtPosition} from "../../../../../operating/color/writeWithAlphaColorToImageAtPosition.ts";
export class ErrorDiffusionDitheringMapperOperator extends MapperOperator {
	public constructor(
		calculationPolicy: ErrorDiffusionDitheringMapperOperatorKernelCalculationPolicy,
		kernel: ErrorDiffusionDitheringMapperOperatorKernel,
	) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return ErrorDiffusionDitheringMapperOperatorDisplayer(...newParameters);
			},
			"error-diffusion-dithering",
			"Error Diffusion Dithering",
		);
		this.calculationPolicy = calculationPolicy;
		this.kernel = kernel;
	}
	public readonly calculationPolicy: ErrorDiffusionDitheringMapperOperatorKernelCalculationPolicy;
	public readonly kernel: ErrorDiffusionDitheringMapperOperatorKernel;
	public *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			new Uint8ClampedArray(inputImages[0].data),
			inputImages[0].width,
			inputImages[0].height,
		);
		switch (this.calculationPolicy) {
			case "computeErrorContinuouslyAndSumContinuouslyWithoutClamping": {
				function createCache(): ContinuousWithAlphaColorBuilder[][] {
					const cache: ContinuousWithAlphaColorBuilder[][] = [];
					for (
						let pixelPositionY = 0;
						pixelPositionY < outputImage.height;
						pixelPositionY = pixelPositionY + 1
					) {
						const row: ContinuousWithAlphaColorBuilder[] = [];
						for (
							let pixelPositionX = 0;
							pixelPositionX < outputImage.width;
							pixelPositionX = pixelPositionX + 1
						) {
							const pixelPosition = new Coordinates(
								pixelPositionX,
								pixelPositionY,
							);
							row.push(
								readWithAlphaColorFromImageAtPosition(
									outputImage,
									pixelPosition,
								)
									.convertToContinuous()
									.convertToBuilder(),
							);
						}
						cache.push(row);
					}
					return cache;
				}
				const cache = createCache();
				for (
					let pixelPositionY = 0;
					pixelPositionY < outputImage.height;
					pixelPositionY = pixelPositionY + 1
				) {
					for (
						let pixelPositionX = 0;
						pixelPositionX < outputImage.width;
						pixelPositionX = pixelPositionX + 1
					) {
						yield outputImage;
						const pixelPosition = new Coordinates(
							pixelPositionX,
							pixelPositionY,
						);
						const pixelColor = (
							cache[
								pixelPositionY
							] as readonly ContinuousWithAlphaColorBuilder[]
						)[pixelPositionX] as ContinuousWithAlphaColorBuilder;
						const quantizedColor = pixelColor.build().round();
						const errorColor = pixelColor.subtractColor(quantizedColor);
						writeWithAlphaColorToImageAtPosition(
							outputImage,
							pixelPosition,
							quantizedColor.convertToDiscrete(),
						);
						for (const {relativePixelPosition, multiplier} of [
							...this.kernel.multipliersAtRightCenter.map(
								(multiplier, relativePixelPositionX) => {
									return {
										relativePixelPosition: new Coordinates(
											relativePixelPositionX,
											0,
										),
										multiplier,
									};
								},
							),
							...this.kernel.multiplierRowsAtBottom.flatMap(
								(multiplierRow, relativePixelPositionY) => {
									return [
										...multiplierRow.left.map((multiplier, multiplierIndex) => {
											return {
												relativePixelPosition: new Coordinates(
													-this.kernel.multipliersAtLeftCenterCount
														+ multiplierIndex,
													relativePixelPositionY + 1,
												),
												multiplier,
											};
										}),
										{
											relativePixelPosition: new Coordinates(
												0,
												relativePixelPositionY + 1,
											),
											multiplier: multiplierRow.center,
										},
										...multiplierRow.right.map(
											(multiplier, multiplierIndex) => {
												return {
													relativePixelPosition: new Coordinates(
														multiplierIndex + 1,
														relativePixelPositionY + 1,
													),
													multiplier,
												};
											},
										),
									];
								},
							),
						]) {
							const targetPixelPosition = pixelPosition.addCoordinates(
								relativePixelPosition,
							);
							const originalTargetPixelColor = (
								cache[
									targetPixelPosition.y
								] as readonly ContinuousWithAlphaColorBuilder[]
							)[targetPixelPosition.x] as ContinuousWithAlphaColorBuilder;
							const newTargetPixelColor = originalTargetPixelColor.addBuilder(
								errorColor.multiplyByScalar(multiplier),
							);
							(
								cache[
									targetPixelPosition.y
								] as ContinuousWithAlphaColorBuilder[]
							)[targetPixelPosition.x] = newTargetPixelColor;
						}
					}
				}
				break;
			}
			default: {
				throw new Error(
					`Unsupported calculation policy: ${this.calculationPolicy}.`,
				);
			}
		}
		return inputImages[0];
	}
	public replaceCalculationPolicy(
		newCalculationPolicy: ErrorDiffusionDitheringMapperOperatorKernelCalculationPolicy,
	): ErrorDiffusionDitheringMapperOperator {
		return new ErrorDiffusionDitheringMapperOperator(
			newCalculationPolicy,
			this.kernel,
		);
	}
	public replaceKernel(
		newKernel: ErrorDiffusionDitheringMapperOperatorKernel,
	): ErrorDiffusionDitheringMapperOperator {
		return new ErrorDiffusionDitheringMapperOperator(
			this.calculationPolicy,
			newKernel,
		);
	}
}
