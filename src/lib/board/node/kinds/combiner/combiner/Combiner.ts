import {Operator} from "../../../operator/Operator.ts";
export abstract class Combiner extends Operator {
	protected constructor(id: string, name: string) {
		super(id, name);
	}
	public abstract combine(
		firstInputImage: ImageData,
		secondInputImage: ImageData,
	): Generator<ImageData, ImageData, void>;
}
