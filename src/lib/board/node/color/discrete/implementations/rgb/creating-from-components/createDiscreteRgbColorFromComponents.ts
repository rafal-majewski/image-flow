import type {DiscreteColorComponent} from "../../../component/DiscreteColorComponent.ts";
import type {DiscreteRgbColor} from "../DiscreteRgbColor.ts";
export function createDiscreteRgbColorFromComponents(
	redComponent: DiscreteColorComponent,
	greenComponent: DiscreteColorComponent,
	blueComponent: DiscreteColorComponent,
): DiscreteRgbColor {
	return {red: redComponent, green: greenComponent, blue: blueComponent};
}
