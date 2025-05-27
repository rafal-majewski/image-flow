import type {CombinerNode} from "../../../node/kinds/combiner/CombinerNode.svelte.ts";
import type {Node} from "../../../node/Node.svelte.ts";
import {Edge} from "../../Edge.ts";
export class FirstToCombinerEdge extends Edge<CombinerNode> {
	public constructor(inputNode: Node, outputNode: CombinerNode) {
		super(inputNode, outputNode);
	}
	public override setInputNodeImage(inputNodeImage: ImageData): void {
		this.outputNode.setFirstInputNodeImage(inputNodeImage);
	}
	public override setInputNodeWithImage(
		inputNode: Node,
		inputNodeImage: ImageData,
	): void {
		this.outputNode.setFirstInputNodeWithImage(inputNode, inputNodeImage);
	}
	public override setInputNodeWithoutImage(inputNode: Node): void {
		this.outputNode.setFirstInputNodeWithoutImage(inputNode);
	}
	public override unsetInputNodeImage(): void {
		this.outputNode.unsetFirstInputNodeImage();
	}
}
