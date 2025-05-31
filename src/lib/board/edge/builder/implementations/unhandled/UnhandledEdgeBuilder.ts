import {HandledEdgeBuilder} from "../handled/HandledEdgeBuilder.ts";
import {EdgeBuilder} from "../../EdgeBuilder.ts";
import type {InEdgePut} from "../../../put/implementations/in/InEdgePut.ts";
import type {OutEdgePut} from "../../../put/implementations/out/OutEdgePut.ts";
export class UnhandledEdgeBuilder extends EdgeBuilder {
	public constructor(index: number, output: OutEdgePut) {
		super(index, output);
	}
	public handleInput(input: InEdgePut): HandledEdgeBuilder {
		return new HandledEdgeBuilder(this.index, input, this.output);
	}
}
