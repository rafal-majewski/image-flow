import type {CombinerNode} from "../../../../node/kinds/combiner/CombinerNode.svelte.ts";
import type {Node} from "../../../../node/Node.svelte.ts";
import type {EdgeBuilder} from "../../../unhandled-builder/UnhandledEdgeBuilder.ts";
import {SecondToCombinerEdge} from "../SecondToCombinerEdge.ts";
export class SecondToCombinerEdgeBuilder implements EdgeBuilder<CombinerNode> {
	public constructor(outputNode: CombinerNode) {
		this.outputNode = outputNode;
	}
	public build(inputNode: Node): SecondToCombinerEdge {
		return new SecondToCombinerEdge(inputNode, this.outputNode);
	}
	private readonly outputNode: CombinerNode;
}
