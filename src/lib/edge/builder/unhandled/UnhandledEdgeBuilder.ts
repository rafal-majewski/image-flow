import type {Node} from "../../../node/Node.svelte.ts";
import {HandledEdgeBuilder} from "../handled/HandledEdgeBuilder.ts";
export class UnhandledEdgeBuilder implements EdgeBuilder {
	public constructor(inputIndexInOutput: number, output: Node) {
		this.inputIndexInOutput = inputIndexInOutput;
		this.output = output;
	}
	public handleInput(input: Node): HandledEdgeBuilder {
		return new HandledEdgeBuilder(this.inputIndexInOutput, input, this.output);
	}
	public readonly inputIndexInOutput: number;
	public readonly output: Node;
}
