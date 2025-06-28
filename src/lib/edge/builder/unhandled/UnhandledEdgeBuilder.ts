import type {Node} from "../../../node/Node.svelte.ts";
import type {OperatingNode} from "../../../node/operating/OperatingNode.svelte.ts";
import type {NodeState} from "../../../node/state/NodeState.ts";
import {EdgeBuilder} from "../EdgeBuilder.ts";
import {HandledEdgeBuilder} from "../handled/HandledEdgeBuilder.ts";
export class UnhandledEdgeBuilder extends EdgeBuilder {
	public constructor(output: OperatingNode<number>, outputInputIndex: number) {
		super(output, outputInputIndex);
	}
	public handleInput(input: Node<NodeState>): HandledEdgeBuilder {
		return new HandledEdgeBuilder(input, this.output, this.outputInputIndex);
	}
}
