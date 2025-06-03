import {WithImageEdge} from "../../../implementations/with-image/WithImageEdge.ts";
import {WithoutImageEdge} from "../../../implementations/without-image/WithoutImageEdge.ts";
import type {InEdgePut} from "../../../put/implementations/in/InEdgePut.ts";
import type {OutEdgePut} from "../../../put/implementations/out/OutEdgePut.ts";
import {EdgeBuilder} from "../../EdgeBuilder.ts";
export class HandledEdgeBuilder extends EdgeBuilder {
	public constructor(index: number, input: InEdgePut, output: OutEdgePut) {
		super(index, output);
		this.input = input;
	}
	public buildWithImage(image: ImageData): WithImageEdge {
		return new WithImageEdge(
			`${this.input.id}-${this.index}-${this.output.id}`,
			image,
			this.index,
			this.input,
			this.output,
		);
	}
	public buildWithoutImage(): WithoutImageEdge {
		return new WithoutImageEdge(
			`${this.input.id}-${this.index}-${this.output.id}`,
			this.index,
			this.input,
			this.output,
		);
	}
	private readonly input: InEdgePut;
}
