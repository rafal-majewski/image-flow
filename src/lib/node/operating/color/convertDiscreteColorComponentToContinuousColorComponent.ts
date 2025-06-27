import type {ContinuousColorComponent} from "./ContinuousColorComponent.ts";
import type {DiscreteColorComponent} from "./DiscreteColorComponent.ts";
export function convertDiscreteColorComponentToContinuousColorComponent(
	component: DiscreteColorComponent,
): ContinuousColorComponent {
	return component / 255;
}
