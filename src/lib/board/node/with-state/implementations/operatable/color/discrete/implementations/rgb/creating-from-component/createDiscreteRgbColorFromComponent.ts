import type {DiscreteColorComponent} from "../../../component/DiscreteColorComponent.ts";
import type {DiscreteRgbColor} from "../DiscreteRgbColor.ts";
export function createDiscreteRgbColorFromComponent(
	component: DiscreteColorComponent,
): DiscreteRgbColor {
	return {red: component, green: component, blue: component};
}
