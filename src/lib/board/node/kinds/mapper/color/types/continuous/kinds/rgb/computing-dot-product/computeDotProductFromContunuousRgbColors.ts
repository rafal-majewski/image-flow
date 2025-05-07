import type {ContinuousColorComponent} from "../../../component/ContinuousColorComponent.ts";
import type {ContinuousRgbColor} from "../ContinuousRgbColor.ts";
export function computeDotProductFromContunuousRgbColors(
	color1: ContinuousRgbColor,
	color2: ContinuousRgbColor,
): ContinuousColorComponent {
	return (
		color1.red * color2.red
		+ color1.green * color2.green
		+ color1.blue * color2.blue
	);
}
