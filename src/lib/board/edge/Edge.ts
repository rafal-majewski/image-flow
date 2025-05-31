import type {EdgeId} from "./id/EdgeId.ts";
import {WithImageEdge} from "./implementations/WithImageEdge.ts";
export abstract class Edge {
	protected constructor(
		id: EdgeId,
		index: number,
		input: InEdgePut,
		output: OutEdgePut,
	) {
		this.id = id;
		this.index = index;
		this.input = input;
		this.output = output;
	}
	public readonly id: EdgeId;
	public readonly index: number;
	public readonly input: InEdgePut;
	public readonly output: OutEdgePut;
	public withImage(image: ImageData): WithImageEdge {
		const newEdge = new WithImageEdge(
			this.id,
			image,
			this.index,
			this.input,
			this.output,
		);
		this.output.setInputEdge(newEdge);
		return newEdge;
	}
}
