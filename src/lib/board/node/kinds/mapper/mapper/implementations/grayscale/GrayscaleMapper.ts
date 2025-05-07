import type {ContinuousColorComponent} from "../../../color/types/continuous/component/ContinuousColorComponent.ts";
import type {ContinuousRgbColor} from "../../../color/types/continuous/kinds/rgb/ContinuousRgbColor.ts";
import {computeDotProductFromDiscreteAndContinuousRgbColors} from "../../../color/types/discrete/kinds/rgb/computing-dot-product/computeDotProductFromDiscreteAndContinuousRgbColors.ts";
import {createDiscreteRgbaColorFromComponent} from "../../../color/types/discrete/kinds/rgba/creating-from-component/createDiscreteRgbaColorFromComponent.ts";
import {readRgbaColorFromImage} from "../../../reading-rgba-color-from-image/readRgbaColorFromImage.ts";
import {writeRgbaColorToImage} from "../../../writing-rgba-color-to-image/writeRgbaColorToImage.ts";
import {Mapper} from "../../Mapper.ts";
import {convertColorToGrayscaleColor} from "./converting-color-to-grayscale-color/convertColorToGrayscaleColor.ts";
export class GrayscaleMapper extends Mapper {
	private readonly multiplier: ContinuousRgbColor;
	public constructor(multiplier: ContinuousRgbColor) {
		super("grayscale", "Grayscale");
		this.multiplier = multiplier;
	}
	public withNewMultiplier(newMultiplier: ContinuousRgbColor): GrayscaleMapper {
		return new GrayscaleMapper(newMultiplier);
	}
	public *map(inputImage: ImageData): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(inputImage.width, inputImage.height);
		for (
			let byteIndex = 0;
			byteIndex < inputImage.data.length;
			byteIndex += 4
		) {
			yield outputImage;
			const color = readRgbaColorFromImage(inputImage, byteIndex);
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
}
