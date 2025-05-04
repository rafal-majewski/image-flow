import type {ColorComponentValue} from "../../../../../../../color-component-value/ColorComponentValue.ts";
import type {RgbaColor} from "../../../../../../../color/RgbaColor.ts";
import {Mapper} from "../../Mapper.ts";
import {convertColorToGrayscaleColor} from "./converting-color-to-grayscale-color/convertColorToGrayscaleColor.ts";
export class GrayscaleMapper extends Mapper {
	public constructor() {
		super("grayscale", "Grayscale");
	}
	public *map(inputImage: ImageData): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(inputImage.width, inputImage.height);
		for (
			let byteIndex = 0;
			byteIndex < inputImage.data.length;
			byteIndex += 4
		) {
			yield outputImage;
			const color: RgbaColor = {
				red: inputImage.data[byteIndex] as ColorComponentValue,
				green: inputImage.data[byteIndex + 1] as ColorComponentValue,
				blue: inputImage.data[byteIndex + 2] as ColorComponentValue,
				alpha: inputImage.data[byteIndex + 3] as ColorComponentValue,
			};
			const grayscaleColor = convertColorToGrayscaleColor(color);
			outputImage.data[byteIndex] = grayscaleColor.red;
			outputImage.data[byteIndex + 1] = grayscaleColor.green;
			outputImage.data[byteIndex + 2] = grayscaleColor.blue;
			outputImage.data[byteIndex + 3] = grayscaleColor.alpha;
		}
		return outputImage;
	}
}
