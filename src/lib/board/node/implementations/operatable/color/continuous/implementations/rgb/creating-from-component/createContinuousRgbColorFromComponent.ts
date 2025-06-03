import type {ContinuousColorComponent} from "../../../component/ContinuousColorComponent.ts";
import type {ContinuousRgbColor} from "../ContinuousRgbColor.ts";
export function createContinuousRgbColorFromComponent(
	component: ContinuousColorComponent,
): ContinuousRgbColor {
	return {red: component, green: component, blue: component};
}
