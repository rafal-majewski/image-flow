import type {DiscreteColorComponent} from "../color/types/discrete/component/DiscreteColorComponent.ts";
import type {DiscreteRgbaColor} from "../color/types/discrete/kinds/rgba/DiscreteRgbaColor.ts";
export function readRgbaColorFromImage(
	inputImage: ImageData,
	byteIndex: number,
): DiscreteRgbaColor {
	return {
		red: inputImage.data[byteIndex] as DiscreteColorComponent,
		green: inputImage.data[byteIndex + 1] as DiscreteColorComponent,
		blue: inputImage.data[byteIndex + 2] as DiscreteColorComponent,
		alpha: inputImage.data[byteIndex + 3] as DiscreteColorComponent,
	};
}
