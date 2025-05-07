import type {DiscreteColorComponent} from "../../../component/DiscreteColorComponent.ts";
import type {DiscreteRgbaColor} from "../DiscreteRgbaColor.ts";
export function createDiscreteRgbaColorFromComponent(
	colorComponent: DiscreteColorComponent,
	alphaComponent: DiscreteColorComponent,
): DiscreteRgbaColor {
	return {
		red: colorComponent,
		green: colorComponent,
		blue: colorComponent,
		alpha: alphaComponent,
	};
}
