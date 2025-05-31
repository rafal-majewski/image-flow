import {Edge} from "../../Edge.ts";
import type {InEdgePut} from "./InEdgePut.ts";
import type {OutEdgePut} from "./OutEdgePut.ts";
import type {EdgeId} from "../../id/EdgeId.ts";
export class WithoutImageEdge extends Edge {
	public constructor(
		id: EdgeId,
		index: number,
		input: InEdgePut,
		output: OutEdgePut,
	) {
		super(id, index, input, output);
	}
}
