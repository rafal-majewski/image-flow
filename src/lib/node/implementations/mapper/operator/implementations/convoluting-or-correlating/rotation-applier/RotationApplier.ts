import type {Kernel} from "../kernel/Kernel.ts";
export abstract class RotationApplier {
	protected constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
	public abstract applyRotation(kernel: Kernel): Kernel;
	public readonly id: string;
	public readonly name: string;
}
