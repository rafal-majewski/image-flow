import type {Color} from "./Color";
import type {ColorComponentValue} from "./ColorComponentValue";
import {Mapper} from "./Mapper";
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
	public map(input: ImageData): ImageData {
		const result = new ImageData(input.width, input.height);
		for (let byteIndex = 0; byteIndex < input.data.length; byteIndex += 4) {
			const color: Color = {
				red: input.data[byteIndex] as ColorComponentValue,
				green: input.data[byteIndex + 1] as ColorComponentValue,
				blue: input.data[byteIndex + 2] as ColorComponentValue,
				alpha: input.data[byteIndex + 3] as ColorComponentValue,
			};
			const grayscaleColor = this.convertColorToGrayscaleColor(color);
			result.data[byteIndex] = grayscaleColor.red;
			result.data[byteIndex + 1] = grayscaleColor.green;
			result.data[byteIndex + 2] = grayscaleColor.blue;
			result.data[byteIndex + 3] = grayscaleColor.alpha;
		}
		return result;
	}
}
