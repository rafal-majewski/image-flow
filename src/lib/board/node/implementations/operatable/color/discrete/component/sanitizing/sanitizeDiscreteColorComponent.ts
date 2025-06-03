import type {DiscreteColorComponent} from "../DiscreteColorComponent.ts";
export function sanitizeDiscreteColorComponent(
	component: DiscreteColorComponent,
): DiscreteColorComponent {
	return Math.max(0, Math.min(255, component));
}
