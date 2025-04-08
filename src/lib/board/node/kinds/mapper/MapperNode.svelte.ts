import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import type {Mapper} from "./mapper/Mapper.ts";
import {NoInputAndNoMapperMapperNodeState} from "./state/kinds/no-input-and-no-mapper/NoInputAndNoMapperMapperNodeState.ts";
import type {SupportedMapperNodeState} from "./SupportedMapperNodeState.ts";
import type {SupportedNode} from "../../SupportedNode.ts";
import type {NodeId} from "../../id/NodeId.ts";
export class MapperNode extends Node {
	public inputNode: SupportedNode | null = $state.raw() as SupportedNode | null;
	public state: SupportedMapperNodeState =
		$state.raw() as SupportedMapperNodeState;
	public constructor(position: Coordinates, id: NodeId) {
		super("Mapper", position, id);
		this.position = position;
		this.state = new NoInputAndNoMapperMapperNodeState();
		this.inputNode = null;
	}
	public setMapper(mapper: Mapper): void {
		this.state = this.state.setMapper(mapper, this.outputNodes);
	}
	public unsetInput(): void {
		this.state = this.state.unsetInput(this.outputNodes);
	}
	public unsetMapper(): void {
		this.state = this.state.unsetMapper(this.outputNodes);
	}
	public setInput(input: ImageData): void {
		this.state = this.state.setInput(input, this.outputNodes);
	}
	public handleNewOutputNode(outputNode: MapperNode): void {
		this.state.handleNewOutputNode(outputNode);
	}
}
