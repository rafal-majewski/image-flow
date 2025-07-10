import type {ContinuousColorComponent} from "../../../../../../operating/color/ContinuousColorComponent.ts";
export function quantize(
	component: ContinuousColorComponent,
	/**
	 * Positive natural number.
	 */
	levelCount: number,
): number {
	if (levelCount == 1) {
		return 0.5;
	} else {
		const stepSize = 1 / (levelCount - 1);
		return Math.round(component / stepSize) * stepSize;
	}
}
