import type {DiscreteColorComponent} from "./DiscreteColorComponent.ts";
export function sanitizeDiscreteColorComponent(
	component: number,
): DiscreteColorComponent {
	return Math.max(0, Math.min(component, 255));
}
