import {Edge} from "../../Edge.ts";
import type {EdgeId} from "../../id/EdgeId.ts";
import type {InEdgePut} from "../../put/implementations/in/InEdgePut.ts";
import type {OutEdgePut} from "../../put/implementations/out/OutEdgePut.ts";
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
