import {RotationApplier} from "../../RotationApplier.ts";
export class CorrelatingRotationApplier extends RotationApplier {
	public constructor() {
		super("correlating", "Correlating");
	}
	public override applyRotation(
		kernel: readonly [
			readonly [number, ...(readonly number[])],
			...(readonly [number, ...(readonly number[])])[],
		],
	): readonly [
		readonly [number, ...(readonly number[])],
		...(readonly [number, ...(readonly number[])])[],
	] {
		return kernel;
	}
}
