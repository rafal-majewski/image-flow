import type {CombinerNode} from "../../../../../../node/kinds/combiner/CombinerNode.svelte.ts";
import type {Node} from "../../../../../../node/Node.svelte.ts";
import type {HandledEdgeBuilder} from "../../../../../handled-builder/HandledEdgeBuilder.ts";
import {FirstToCombinerEdge} from "../../../FirstToCombinerEdge.ts";
export class WithImageHandledFirstToCombinerEdgeBuilder
	implements HandledEdgeBuilder<CombinerNode>
{
	public constructor(outputNode: CombinerNode, image: ImageData) {
		this.outputNode = outputNode;
		this.image = image;
	}
	public build(inputNode: Node): FirstToCombinerEdge {
		const edge = new FirstToCombinerEdge(inputNode, this.outputNode);
		this.outputNode.setFirstInputEdgeWithImage(edge, this.image);
		return edge;
	}
	private readonly image: ImageData;
	private readonly outputNode: CombinerNode;
}
