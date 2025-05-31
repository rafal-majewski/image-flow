import type {ContinuousColorComponent} from "../../../component/ContinuousColorComponent.ts";
import type {ContinuousRgbColor} from "../ContinuousRgbColor.ts";
export function multiplyContinuousRgbColorWithComponent(
	color: ContinuousRgbColor,
	component: ContinuousColorComponent,
): ContinuousRgbColor {
	return {
		red: color.red * component,
		green: color.green * component,
		blue: color.blue * component,
	};
}
