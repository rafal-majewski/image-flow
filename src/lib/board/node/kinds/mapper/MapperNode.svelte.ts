import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import type {SupportedInputNode} from "../../SupportedInputNode.ts";
import type {OutputNode} from "../../OutputNode.ts";
import type {NodeId} from "../../id/NodeId.ts";
import type {Mapper} from "./mapper/Mapper.ts";
import type {SupportedMapperNodeState} from "./state/SupportedMapperNodeState.ts";
import {NoInputNodeAndNoMapperMapperNodeState} from "./state/kinds/no-input-node-and-no-mapper/NoInputNodeAndNoMapperMapperNodeState.ts";
import type {InputNode} from "../../InputNode.ts";
export class MapperNode extends Node implements InputNode, OutputNode {
	private constructor(
		id: NodeId,
		position: Coordinates,
		outputNodes: readonly OutputNode[],
		state: SupportedMapperNodeState,
	) {
		super(id, position);
		this.outputNodes = outputNodes;
		this.state = state;
	}
	public outputNodes: readonly OutputNode[] = $state() as readonly OutputNode[];
	public state: SupportedMapperNodeState = $state() as SupportedMapperNodeState;
	public readonly status = $derived(this.state.status);
	public addOutputNode(outputNodeToAdd: OutputNode): void {
		this.outputNodes = [...this.outputNodes, outputNodeToAdd];
	}
	public connectOutputNode(outputNodeToConnect: OutputNode): void {
		this.state.connectOutputNode(this, outputNodeToConnect);
	}
	public unsetMapper(): void {
		this.state = this.state.unsetMapper(this.outputNodes);
	}
	public setMapper(mapper: Mapper): void {
		this.state = this.state.setMapper(mapper, this.outputNodes);
	}
	public unsetInputNode(): void {
		this.state = this.state.unsetInputNode(this.outputNodes);
	}
	public unsetInputImage(): void {
		this.state = this.state.unsetInputImage(this.outputNodes);
	}
	public static create(id: NodeId, position: Coordinates): MapperNode {
		return new MapperNode(
			id,
			position,
			[],
			new NoInputNodeAndNoMapperMapperNodeState(),
		);
	}
	public override disconnect(): void {
		for (const outputNode of this.outputNodes) {
			outputNode.unsetInputNode();
		}
		this.state = this.state.disconnectFromInputNode(this);
		this.outputNodes = [];
	}
	public setInputNodeWithInputImage(
		inputNode: SupportedInputNode,
		inputImage: ImageData,
	): void {
		this.state = this.state.setInputNodeWithInputImage(
			inputNode,
			inputImage,
			this.outputNodes,
		);
	}
	public setInputNodeWithoutInputImage(inputNode: SupportedInputNode): void {
		this.state = this.state.setInputNodeWithoutInputImage(
			inputNode,
			this.outputNodes,
		);
	}
	public setInputNode(inputNode: SupportedInputNode): void {
		this.state = this.state.setInputNodeWithoutInputImage(
			inputNode,
			this.outputNodes,
		);
	}
	public doSteps(): void {
		this.state = this.state.doSteps(100, this.outputNodes);
	}
	public setInputImage(inputImage: ImageData): void {
		this.state = this.state.setInputImage(inputImage, this.outputNodes);
	}
	public deleteOutputNode(outputNodeToDelete: OutputNode): void {
		this.outputNodes = this.outputNodes.filter(
			(outputNode) => outputNode !== outputNodeToDelete,
		);
	}
}
