import type {DiscreteColorComponent} from "../../../component/DiscreteColorComponent.ts";
import type {DiscreteRgbaColor} from "../DiscreteRgbaColor.ts";
export function createDiscreteRgbaColorFromComponents(
	redComponent: DiscreteColorComponent,
	greenComponent: DiscreteColorComponent,
	blueComponent: DiscreteColorComponent,
	alphaComponent: DiscreteColorComponent,
): DiscreteRgbaColor {
	return {
		red: redComponent,
		green: greenComponent,
		blue: blueComponent,
		alpha: alphaComponent,
	};
}
