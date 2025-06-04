export abstract class RotationApplier {
	protected constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
	public readonly id: string;
	public readonly name: string;
	public abstract applyRotation(
		kernel: readonly [
			readonly [number, ...(readonly number[])],
			...(readonly [number, ...(readonly number[])])[],
		],
	): readonly [
		readonly [number, ...(readonly number[])],
		...(readonly [number, ...(readonly number[])])[],
	];
}
