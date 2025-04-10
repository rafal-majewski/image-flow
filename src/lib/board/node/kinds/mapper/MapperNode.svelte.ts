import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import type {Mapper} from "./mapper/Mapper.ts";
import {NoInputAndNoMapperMapperNodeState} from "./state/kinds/no-input-and-no-mapper/NoInputAndNoMapperMapperNodeState.ts";
import type {SupportedMapperNodeState} from "./SupportedMapperNodeState.ts";
import type {SupportedNode} from "../../SupportedNode.ts";
import type {NodeId} from "../../id/NodeId.ts";
export class MapperNode extends Node {
	private state: SupportedMapperNodeState =
		$state.raw() as SupportedMapperNodeState;
	public constructor(position: Coordinates, id: NodeId) {
		super("Mapper", position, id);
		this.position = position;
		this.state = new NoInputAndNoMapperMapperNodeState();
	}
	public setMapper(mapper: Mapper): void {
		this.state = this.state.setMapper(mapper, this.$outputNodes);
	}
	public unsetInputImage(): void {
		this.state = this.state.unsetInputImage(this.$outputNodes);
	}
	public unsetMapper(): void {
		this.state = this.state.unsetMapper(this.$outputNodes);
	}
	// public setInputImage(input: ImageData): void {
	// 	this.state = this.state.setInputImage(input, this.$outputNodes);
	// }
	public handleNewOutputNode(outputNode: MapperNode): void {
		this.state.handleNewOutputNode(outputNode);
	}
	public setInputNodeWithInputImage(
		inputNode: SupportedNode,
		inputImage: ImageData,
	): void {
		this.inputNode = inputNode;
		this.state = this.state.setInputImage(inputImage, this.$outputNodes);
	}
	public setInputNodeWithoutInputImage(inputNode: SupportedNode): void {
		this.inputNode = inputNode;
		this.state = this.state.unsetInputImage(this.$outputNodes);
	}
	public unsetInputNode(): void {
		this.inputNode = null;
		this.state = this.state.unsetInputImage(this.$outputNodes);
	}
}
