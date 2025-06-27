import type {ContinuousColorComponent} from "./ContinuousColorComponent.ts";
export function sanitizeContinuousColorComponent(
	component: number,
): ContinuousColorComponent {
	return Math.max(0, Math.min(component, 1));
}
