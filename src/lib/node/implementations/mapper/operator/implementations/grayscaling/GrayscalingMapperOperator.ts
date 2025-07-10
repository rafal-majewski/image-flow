import type {ContinuousWithoutAlphaColor} from "../../../../../operating/color/ContinuousWithoutAlphaColor.ts";
import {DiscreteWithAlphaColor} from "../../../../../operating/color/DiscreteWithAlphaColor.ts";
import {readWithAlphaColorFromImageAtPosition} from "../../../../../operating/color/readWithAlphaColorFromImageAtPosition.ts";
import {sanitizeDiscreteColorComponent} from "../../../../../operating/color/sanitizeDiscreteColorComponent.ts";
import {setEachPixelYielding} from "../../../../../operating/operator/setting-each-pixel-yielding/setEachPixelYielding.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import GrayscalingMapperOperatorDisplayer from "./displayer/GrayscalingMapperOperatorDisplayer.svelte";
export class GrayscalingMapperOperator extends MapperOperator {
	public constructor(multiplier: ContinuousWithoutAlphaColor) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], operator: this},
				] as const;
				return GrayscalingMapperOperatorDisplayer(...newParameters);
			},
			"grayscaling",
			"Grayscaling",
		);
		this.multiplier = multiplier;
	}
	public readonly multiplier: ContinuousWithoutAlphaColor;
	public *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			inputImages[0].width,
			inputImages[0].height,
		);
		yield* setEachPixelYielding(outputImage, (position) => {
			const colorWithAlphaComponent = readWithAlphaColorFromImageAtPosition(
				inputImages[0],
				position,
			);
			const continuousColorWithoutAlphaComponent = colorWithAlphaComponent
				.deleteAlphaComponent()
				.convertToContinuous();
			const grayness = continuousColorWithoutAlphaComponent.computeDotProduct(
				this.multiplier,
			);
			const colorComponent = sanitizeDiscreteColorComponent(grayness * 255);
			return new DiscreteWithAlphaColor(
				colorComponent,
				colorComponent,
				colorComponent,
				colorWithAlphaComponent.alphaComponent,
			);
		});
		return outputImage;
	}
	public replaceMultiplier(
		newMultiplier: ContinuousWithoutAlphaColor,
	): GrayscalingMapperOperator {
		return new GrayscalingMapperOperator(newMultiplier);
	}
}
