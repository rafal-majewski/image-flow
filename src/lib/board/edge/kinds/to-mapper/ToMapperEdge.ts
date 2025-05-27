import type {MapperNode} from "../../../node/kinds/mapper/MapperNode.svelte.ts";
import type {Node} from "../../../node/Node.svelte.ts";
import type {OutputNode} from "../../../node/OutputNode.ts";
import {Edge} from "../../Edge.ts";
export class ToMapperEdge extends Edge<MapperNode> {
	public constructor(inputNode: Node, outputNode: MapperNode) {
		super(inputNode, outputNode);
	}
	public override setInputNodeImage(inputNodeImage: ImageData): void {
		this.outputNode.setInputNodeImage(inputNodeImage);
	}
	public override setInputNodeWithImage(
		inputNode: Node,
		inputNodeImage: ImageData,
	): void {
		this.outputNode.setInputNodeWithImage(inputNode, inputNodeImage);
	}
	public override setInputNodeWithoutImage(inputNode: Node): void {
		this.outputNode.setInputNodeWithoutImage(inputNode);
	}
	public override unsetInputNodeImage(): void {
		this.outputNode.unsetInputNodeImage();
	}
}
