import type {OperatorId} from "./id/OperatorId.ts";
export abstract class Operator<
	IdToUse extends OperatorId,
	InputImageCount extends number,
	Name extends string,
> {
	public constructor(id: IdToUse, name: Name) {
		this.id = id;
		this.name = name;
	}
	public readonly id: IdToUse;
	public readonly name: Name;
	public abstract operate(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
	): Generator<ImageData, ImageData, void>;
}
