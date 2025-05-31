import type {ContinuousRgbColor} from "../../../../../color/continuous/implementations/rgb/ContinuousRgbColor.ts";
import {computeDotProductFromDiscreteAndContinuousRgbColors} from "../../../../../color/discrete/implementations/rgb/computing-dot-product/computeDotProductFromDiscreteAndContinuousRgbColors.ts";
import {createDiscreteRgbaColorFromComponent} from "../../../../../color/discrete/implementations/rgba/creating-from-component/createDiscreteRgbaColorFromComponent.ts";
import {readRgbaColorFromImage} from "../../../../../reading-rgba-color-from-image/readRgbaColorFromImage.ts";
import {writeRgbaColorToImage} from "../../../../../writing-rgba-color-to-image/writeRgbaColorToImage.ts";
import {MapperOperator} from "../../MapperOperator.ts";
export class GrayscalingMapperOperator extends MapperOperator {
	public constructor(multiplier: ContinuousRgbColor) {
		super("grayscaling", "Grayscaling");
		this.multiplier = multiplier;
	}
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
			const color = readRgbaColorFromImage(inputImages[0], byteIndex);
			const grayness = computeDotProductFromDiscreteAndContinuousRgbColors(
				color,
				this.multiplier,
			);
			writeRgbaColorToImage(
				outputImage,
				byteIndex,
				createDiscreteRgbaColorFromComponent(grayness, color.alpha),
			);
		}
		return outputImage;
	}
	public readonly multiplier: ContinuousRgbColor;
	public withNewMultiplier(
		newMultiplier: ContinuousRgbColor,
	): GrayscalingMapperOperator {
		return new GrayscalingMapperOperator(newMultiplier);
	}
}
