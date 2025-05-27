import {Operator} from "../../../operator/Operator.ts";
export abstract class Mapper extends Operator {
	protected constructor(id: string, name: string) {
		super(id, name);
	}
	public abstract map(
		inputImage: ImageData,
	): Generator<ImageData, ImageData, void>;
}
