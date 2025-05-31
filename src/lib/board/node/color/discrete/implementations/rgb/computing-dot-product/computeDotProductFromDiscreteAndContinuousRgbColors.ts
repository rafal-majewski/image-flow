import type {ContinuousRgbColor} from "../../../../continuous/implementations/rgb/ContinuousRgbColor.ts";
import type {DiscreteColorComponent} from "../../../component/DiscreteColorComponent.ts";
import type {DiscreteRgbColor} from "../DiscreteRgbColor.ts";
export function computeDotProductFromDiscreteAndContinuousRgbColors(
	color1: DiscreteRgbColor,
	color2: ContinuousRgbColor,
): DiscreteColorComponent {
	return (
		color1.red * color2.red
		+ color1.green * color2.green
		+ color1.blue * color2.blue
	);
}
