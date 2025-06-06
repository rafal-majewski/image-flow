import {writeRgbaColorToImageAtByteIndex} from "../../../../../../../writing-rgba-color-to-image-at-byte-index/writeRgbaColorToImageAtByteIndex.ts";
import type {ContinuousRgbColor} from "../../../../../color/continuous/implementations/rgb/ContinuousRgbColor.ts";
import {computeDotProductFromDiscreteAndContinuousRgbColors} from "../../../../../color/discrete/implementations/rgb/computing-dot-product/computeDotProductFromDiscreteAndContinuousRgbColors.ts";
import {createDiscreteRgbaColorFromComponent} from "../../../../../color/discrete/implementations/rgba/creating-from-component/createDiscreteRgbaColorFromComponent.ts";
import {readRgbaColorFromImageAtByteIndex} from "../../../../../reading-rgba-color-from-image-at-byte-index/readRgbaColorFromImageAtByteIndex.ts";
import {MapperOperator} from "../../MapperOperator.ts";
import GrayscalingMapperOperatorDisplayer from "./displayer/GrayscalingMapperOperatorDisplayer.svelte";
export class GrayscalingMapperOperator extends MapperOperator {
	public constructor(multiplier: ContinuousRgbColor) {
		super(
			// @ts-expect-error
			GrayscalingMapperOperatorDisplayer,
			"grayscaling",
			"Grayscaling",
		);
		this.multiplier = multiplier;
	}
	public readonly multiplier: ContinuousRgbColor;
	public override *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			inputImages[0].width,
			inputImages[0].height,
		);
		for (
			let byteIndex = 0;
			byteIndex < inputImages[0].data.length;
			byteIndex += 4
		) {
			yield outputImage;
			const color = readRgbaColorFromImageAtByteIndex(
				inputImages[0],
				byteIndex,
			);
			const grayness = computeDotProductFromDiscreteAndContinuousRgbColors(
				color,
				this.multiplier,
			);
			writeRgbaColorToImageAtByteIndex(
				outputImage,
				byteIndex,
				createDiscreteRgbaColorFromComponent(grayness, color.alpha),
			);
		}
		return outputImage;
	}
	public withNewMultiplier(
		newMultiplier: ContinuousRgbColor,
	): GrayscalingMapperOperator {
		return new GrayscalingMapperOperator(newMultiplier);
	}
}
