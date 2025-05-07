import type {DiscreteColorComponent} from "../color/types/discrete/component/DiscreteColorComponent.ts";
import type {DiscreteRgbColor} from "../color/types/discrete/kinds/rgb/DiscreteRgbColor.ts";
export function readRgbColorFromImage(
	inputImage: ImageData,
	byteIndex: number,
): DiscreteRgbColor {
	return {
		red: inputImage.data[byteIndex] as DiscreteColorComponent,
		green: inputImage.data[byteIndex + 1] as DiscreteColorComponent,
		blue: inputImage.data[byteIndex + 2] as DiscreteColorComponent,
	};
}
