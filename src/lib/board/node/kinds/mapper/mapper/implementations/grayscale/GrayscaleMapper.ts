import type {ColorComponentValue} from "../../../../../../../color-component-value/ColorComponentValue.ts";
import type {Color} from "../../../../../../../color/Color.ts";
import {Mapper} from "../../Mapper.ts";
export class GrayscaleMapper extends Mapper {
	public constructor() {
		super("grayscale", "Grayscale");
	}
	private computeGrayness(color: Color): number {
		return color.red * 0.3 + color.green * 0.59 + color.blue * 0.11;
	}
	private convertColorToGrayscaleColor(color: Color): Color {
		const grayness = this.computeGrayness(color);
		return {red: grayness, green: grayness, blue: grayness, alpha: color.alpha};
	}
	public *map(inputImage: ImageData): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(inputImage.width, inputImage.height);
		for (
			let byteIndex = 0;
			byteIndex < inputImage.data.length;
			byteIndex += 4
		) {
			yield outputImage;
			const color: Color = {
				red: inputImage.data[byteIndex] as ColorComponentValue,
				green: inputImage.data[byteIndex + 1] as ColorComponentValue,
				blue: inputImage.data[byteIndex + 2] as ColorComponentValue,
				alpha: inputImage.data[byteIndex + 3] as ColorComponentValue,
			};
			const grayscaleColor = this.convertColorToGrayscaleColor(color);
			outputImage.data[byteIndex] = grayscaleColor.red;
			outputImage.data[byteIndex + 1] = grayscaleColor.green;
			outputImage.data[byteIndex + 2] = grayscaleColor.blue;
			outputImage.data[byteIndex + 3] = grayscaleColor.alpha;
		}
		return outputImage;
	}
}
