import type {Kernel} from "../../../kernel/Kernel.ts";
import {RotationApplier} from "../../RotationApplier.ts";
export class ConvolutingRotationApplier extends RotationApplier {
	public constructor() {
		super("convoluting", "Convoluting");
	}
	public override applyRotation(kernel: Kernel): Kernel {
		return kernel.rotateBy180DegreesClockwise();
	}
}
