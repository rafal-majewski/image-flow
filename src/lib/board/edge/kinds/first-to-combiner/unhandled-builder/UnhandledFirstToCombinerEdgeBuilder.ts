import type {CombinerNode} from "../../../../node/kinds/combiner/CombinerNode.svelte.ts";
import {FirstToCombinerEdge} from "../FirstToCombinerEdge.ts";
import type {Node} from "../../../../node/Node.svelte.ts";
import type {UnhandledEdgeBuilder} from "../../../unhandled-builder/UnhandledEdgeBuilder.ts";
import {WithoutImageHandledFirstToCombinerEdgeBuilder} from "../handled-builder/types/without-image/WithoutImageHandledFirstToCombinerEdgeBuilder.ts";
export class UnhandledFirstToCombinerEdgeBuilder
	implements UnhandledEdgeBuilder<CombinerNode>
{
	public constructor(outputNode: CombinerNode) {
		this.outputNode = outputNode;
	}
	private readonly outputNode: CombinerNode;
	public withImage(
		image: ImageData,
	): WithImageHandledFirstToCombinerEdgeBuilder {
		return new WithImageHandledFirstToCombinerEdgeBuilder(
			this.outputNode,
			image,
		);
	}
	public withoutImage(): WithoutImageHandledFirstToCombinerEdgeBuilder {
		return new WithoutImageHandledFirstToCombinerEdgeBuilder(this.outputNode);
	}
}
