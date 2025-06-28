import type {Kernel} from "../../../kernel/Kernel.ts";
import {RotationApplier} from "../../RotationApplier.ts";
export class CorrelatingRotationApplier extends RotationApplier {
	public constructor() {
		super("correlating", "Correlating");
	}
	public override applyRotation(kernel: Kernel): Kernel {
		return kernel;
	}
}
