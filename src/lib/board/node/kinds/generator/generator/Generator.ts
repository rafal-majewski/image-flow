import {Operator} from "../../../operator/Operator.ts";
export abstract class Generator_ extends Operator {
	protected constructor(id: string, name: string) {
		super(id, name);
	}
	public abstract generate(): Generator<ImageData, ImageData, void>;
}
