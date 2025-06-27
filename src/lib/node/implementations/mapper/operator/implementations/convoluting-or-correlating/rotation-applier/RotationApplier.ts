export abstract class RotationApplier {
	protected constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
	public abstract applyRotation(
		kernel: readonly [
			readonly [number, ...(readonly number[])],
			...(readonly [number, ...(readonly number[])])[],
		],
	): readonly [
		readonly [number, ...(readonly number[])],
		...(readonly [number, ...(readonly number[])])[],
	];
	public readonly id: string;
	public readonly name: string;
}
