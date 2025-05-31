import type {DiscreteColorComponent} from "../../../component/DiscreteColorComponent.ts";
import type {DiscreteRgbColor} from "../../rgb/DiscreteRgbColor.ts";
import type {DiscreteRgbaColor} from "../DiscreteRgbaColor.ts";
export function createDiscreteRgbaColorFromDiscreteRgbColor(
	color: DiscreteRgbColor,
	alphaComponent: DiscreteColorComponent,
): DiscreteRgbaColor {
	return {...color, alpha: alphaComponent};
}
