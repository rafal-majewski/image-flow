import {RotationApplier} from "../../RotationApplier.ts";
import {rotateMatrixBy180DegreesClockwise} from "./rotating-matrix-by-180-degrees-clockwise/rotateMatrixBy180DegreesClockwise.ts";
export class ConvolutingRotationApplier extends RotationApplier {
	public constructor() {
		super("convoluting", "Convoluting");
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
		console.log(kernel, rotateMatrixBy180DegreesClockwise(kernel));
		return rotateMatrixBy180DegreesClockwise(kernel) as readonly [
			readonly [number, ...(readonly number[])],
			...(readonly [number, ...(readonly number[])])[],
		];
	}
}
