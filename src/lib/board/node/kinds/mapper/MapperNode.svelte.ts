import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import type {Mapper} from "./mapper/Mapper.ts";
export class MapperNode extends Node {
	public constructor(position: Coordinates) {
		super(position, new ManualNoInputEdgeAndNoMapperMapperNodeState(1));
	}
	public setInputEdge(inputNode: Node, inputImage: ImageData): void {
		this.state = this.state.setInputEdgeWithImage(
			this,
			inputNode,
			inputImage,
			this.outputNodes,
		);
	}
	public setInputEdgeWithoutImage(inputNode: Node): void {
		this.state = this.state.setInputEdgeWithoutImage(
			this,
			inputNode,
			this.outputNodes,
		);
	}
	public setInputNodeImage(inputImage: ImageData): void {
		this.state = this.state.setInputNodeImage(inputImage, this.outputNodes);
	}
	public setMapper(mapper: Mapper): void {
		this.state = this.state.setMapper(mapper, this.outputNodes);
	}
	public unsetInputNode(): void {
		this.state = this.state.unsetInputNode(this, this.outputNodes);
	}
	public unsetInputNodeImage(): void {
		this.state = this.state.unsetInputNodeImage(this.outputNodes);
	}
	public unsetMapper(): void {
		this.state = this.state.unsetMapper(this.outputNodes);
	}
	protected override updateOutputEdgeAfterAdding(
		outputEdgeToUpdate: OutputEdge,
	): void {
		this.state.updateOutputEdgeAfterAdding(this, outputNodeToUpdate);
	}
}
