import type {Node} from "../../../../node/Node.svelte.ts";
import {EdgeBuilder} from "../../EdgeBuilder.ts";
import {HandledEdgeBuilder} from "../handled/HandledEdgeBuilder.ts";
export class UnhandledEdgeBuilder extends EdgeBuilder {
	public constructor(index: number, output: Node<number>) {
		super(index, output);
	}
	public handleInput(input: Node<number>): HandledEdgeBuilder {
		return new HandledEdgeBuilder(this.index, input, this.output);
	}
}
