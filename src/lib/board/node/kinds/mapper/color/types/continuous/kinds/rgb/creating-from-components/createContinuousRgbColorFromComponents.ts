import type {ContinuousColorComponent} from "../../../component/ContinuousColorComponent.ts";
import type {ContinuousRgbColor} from "../ContinuousRgbColor.ts";
export function createContinuousRgbColorFromComponents(
	redComponent: ContinuousColorComponent,
	greenComponent: ContinuousColorComponent,
	blueComponent: ContinuousColorComponent,
): ContinuousRgbColor {
	return {red: redComponent, green: greenComponent, blue: blueComponent};
}
