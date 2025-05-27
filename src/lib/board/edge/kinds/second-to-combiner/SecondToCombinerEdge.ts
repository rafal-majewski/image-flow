import type {CombinerNode} from "../../../node/kinds/combiner/CombinerNode.svelte.ts";
import type {MapperNode} from "../../../node/kinds/mapper/MapperNode.svelte.ts";
import type {Node} from "../../../node/Node.svelte.ts";
import type {OutputNode} from "../../../node/OutputNode.ts";
import {Edge} from "../../Edge.ts";
export class SecondToCombinerEdge extends Edge<CombinerNode> {
	public constructor(inputNode: Node, outputNode: CombinerNode) {
		super(inputNode, outputNode);
	}
	public override setInputNodeImage(inputNodeImage: ImageData): void {
		this.outputNode.setSecondInputNodeImage(inputNodeImage);
	}
	public override setInputNodeWithImage(
		inputNode: Node,
		inputNodeImage: ImageData,
	): void {
		this.outputNode.setSecondInputNodeWithImage(inputNode, inputNodeImage);
	}
	public override setInputNodeWithoutImage(inputNode: Node): void {
		this.outputNode.setSecondInputNodeWithoutImage(inputNode);
	}
	public override unsetInputNodeImage(): void {
		this.outputNode.unsetSecondInputNodeImage();
	}
}
