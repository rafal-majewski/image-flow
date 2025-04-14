import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import type {OutputNode} from "../../OutputNode.ts";
import type {SupportedInputNode} from "../../SupportedInputNode.ts";
import type {SupportedOutputNode} from "../../SupportedOutputNode.ts";
import type {NodeId} from "../../id/NodeId.ts";
import type {Mapper} from "./mapper/Mapper.ts";
import type {SupportedMapperNodeState} from "./state/SupportedMapperNodeState.ts";
import {MappingInProgressMapperNodeState} from "./state/kinds/mapping-in-progress/MappingInProgressMapperNodeState.ts";
import {MappingSucceededMapperNodeState} from "./state/kinds/mapping-succeeded/MappingSucceededMapperNodeState.ts";
import {NoInputImageMapperNodeState} from "./state/kinds/no-input-image/NoInputImageMapperNodeState.ts";
import {NoInputNodeAndNoMapperMapperNodeState} from "./state/kinds/no-input-node-and-no-mapper/NoInputNodeAndNoMapperMapperNodeState.ts";
import {NoInputNodeMapperNodeState} from "./state/kinds/no-input-node/NoInputNodeMapperNodeState.ts";
export class MapperNode extends Node {
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
	public addOutputNode(outputNodeToAdd: SupportedOutputNode): void {
		this.outputNodes = [...this.outputNodes, outputNodeToAdd];
	}
	public connectOutputNode(outputNodeToConnect: SupportedOutputNode): void {
		this.state.connectOutputNode(this, outputNodeToConnect);
	}
	public unsetMapper(): void {
		if (
			this.state instanceof MappingInProgressMapperNodeState
			|| this.state instanceof MappingSucceededMapperNodeState
			|| this.state instanceof NoInputImageMapperNodeState
			|| this.state instanceof NoInputNodeMapperNodeState
		) {
			this.state = this.state.unsetMapper(this.outputNodes);
		}
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
		this.state = this.state.disconnect(this, this.outputNodes);
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
	public doStep(): void {
		for (let stepIndex = 0; stepIndex < 100; stepIndex += 1) {
			if (this.state instanceof MappingInProgressMapperNodeState) {
				this.state = this.state.doStep(this.outputNodes);
			} else {
				break;
			}
		}
	}
	public setInputImage(inputImage: ImageData): void {
		this.state = this.state.setInputImage(inputImage, this.outputNodes);
	}
	public deleteOutputNode(outputNodeToDelete: SupportedOutputNode): void {
		this.outputNodes = this.outputNodes.filter(
			(outputNode) => outputNode !== outputNodeToDelete,
		);
	}
}
