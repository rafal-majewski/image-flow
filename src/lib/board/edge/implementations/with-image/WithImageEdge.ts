import {Edge} from "../../Edge.ts";
import type {EdgeId} from "../../id/EdgeId.ts";
import type {InEdgePut} from "../../put/implementations/in/InEdgePut.ts";
import type {OutEdgePut} from "../../put/implementations/out/OutEdgePut.ts";
import {WithoutImageEdge} from "../without-image/WithoutImageEdge.ts";
export class WithImageEdge extends Edge {
	public constructor(
		id: EdgeId,
		image: ImageData,
		index: number,
		input: InEdgePut,
		output: OutEdgePut,
	) {
		super(id, index, input, output);
		this.image = image;
	}
	public readonly image: ImageData;
	public withoutImage(): WithoutImageEdge {
		const newEdge = new WithoutImageEdge(
			this.id,
			this.index,
			this.input,
			this.output,
		);
		this.output.setInputEdge(newEdge);
		return newEdge;
	}
}
