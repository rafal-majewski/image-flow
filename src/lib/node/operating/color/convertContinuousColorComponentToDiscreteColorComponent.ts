import type {ContinuousColorComponent} from "./ContinuousColorComponent.ts";
import type {DiscreteColorComponent} from "./DiscreteColorComponent.ts";
export function convertContinuousColorComponentToDiscreteColorComponent(
	component: ContinuousColorComponent,
): DiscreteColorComponent {
	return Math.round(component * 255);
}
