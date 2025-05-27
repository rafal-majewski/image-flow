import type {HandledEdgeBuilder} from "../../../../../handled-builder/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../Edge.ts";
import type {CombinerNode} from "../../../../../../node/kinds/combiner/CombinerNode.svelte.ts";
import type {Node} from "../../../../../../node/Node.svelte.ts";
export class WithoutImageHandledFirstToCombinerEdgeBuilder
	implements HandledEdgeBuilder<CombinerNode>
{
	public constructor(inputNode: Node) {
		this.inputNode = inputNode;
	}
	public build(outputNode: CombinerNode): Edge<CombinerNode> {
		return new FirstToCombinerEdge(this.inputNode, outputNode);
	}
	private readonly inputNode: Node;
}
