import type {Node} from "../../../node/Node.svelte.ts";
import type {OperatingNode} from "../../../node/operating/OperatingNode.svelte.ts";
import type {NodeState} from "../../../node/state/NodeState.ts";
import {HandledEdgeBuilder} from "../handled/HandledEdgeBuilder.ts";
export class UnhandledEdgeBuilder implements EdgeBuilder {
	public constructor(outputInputIndex: number, output: OperatingNode<number>) {
		this.outputInputIndex = outputInputIndex;
		this.output = output;
	}
	public handleInput(input: Node<NodeState>): HandledEdgeBuilder {
		return new HandledEdgeBuilder(this.outputInputIndex, input, this.output);
	}
	public readonly outputInputIndex: number;
	public readonly output: OperatingNode<number>;
}
