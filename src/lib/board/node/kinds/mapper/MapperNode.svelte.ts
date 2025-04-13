import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import type {SupportedInputNode} from "../../SupportedInputNode.ts";
import type {SupportedOutputNode} from "../../SupportedOutputNode.ts";
import type {NodeId} from "../../id/NodeId.ts";
import type {Mapper} from "./mapper/Mapper.ts";
import type {SupportedMapperNodeState} from "./state/SupportedMapperNodeState.ts";
import {MappingInProgressMapperNodeState} from "./state/kinds/mapping-in-progress/MappingInProgressMapperNodeState.ts";
import {MappingSucceededMapperNodeState} from "./state/kinds/mapping-succeeded/MappingSucceededMapperNodeState.ts";
import {NoInputImageAndNoMapperMapperNodeState} from "./state/kinds/no-input-image-and-no-mapper/NoInputImageAndNoMapperMapperNodeState.ts";
import {NoInputImageMapperNodeState} from "./state/kinds/no-input-image/NoInputImageMapperNodeState.ts";
import {NoInputNodeAndNoMapperMapperNodeState} from "./state/kinds/no-input-node-and-no-mapper/NoInputNodeAndNoMapperMapperNodeState.ts";
import {NoInputNodeMapperNodeState} from "./state/kinds/no-input-node/NoInputNodeMapperNodeState.ts";
import {NoMapperMapperNodeState} from "./state/kinds/no-mapper/NoMapperMapperNodeState.ts";
export class MapperNode extends Node {
	private constructor(
		id: NodeId,
		outputNodes: readonly SupportedOutputNode[],
		position: Coordinates,
		state: SupportedMapperNodeState,
	) {
		super(id, position);
		this.outputNodes = outputNodes;
		this.state = state;
	}
	public outputNodes: readonly SupportedOutputNode[] =
		$state() as readonly SupportedOutputNode[];
	public state: SupportedMapperNodeState = $state() as SupportedMapperNodeState;
	public readonly status = $derived(this.state.status);
	public addOutputNode(outputNode: SupportedOutputNode): void {
		this.outputNodes = [...this.outputNodes, outputNode];
		// TODO: Make it a method on State
		if (this.state instanceof MappingSucceededMapperNodeState) {
			outputNode.setInputNodeWithInputImage(this.state.outputImage, this);
		} else {
			outputNode.setInputNode(this);
		}
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
		if (
			this.state instanceof MappingInProgressMapperNodeState
			|| this.state instanceof MappingSucceededMapperNodeState
			|| this.state instanceof NoInputImageMapperNodeState
			|| this.state instanceof NoInputImageAndNoMapperMapperNodeState
			|| this.state instanceof NoMapperMapperNodeState
		) {
			this.state = this.state.unsetInputNode(this.outputNodes);
		}
	}
	public unsetInputImage(): void {
		if (
			this.state instanceof MappingInProgressMapperNodeState
			|| this.state instanceof MappingSucceededMapperNodeState
			|| this.state instanceof NoMapperMapperNodeState
		) {
			this.state = this.state.unsetInputImage(this.outputNodes);
		}
	}
	public static create(id: NodeId, position: Coordinates): MapperNode {
		return new MapperNode(
			id,
			[],
			position,
			new NoInputNodeAndNoMapperMapperNodeState(),
		);
	}
	public override disconnect(): void {
		for (const outputNode of this.outputNodes) {
			outputNode.unsetInputNode();
		}
		this.outputNodes = [];
		if (
			this.state instanceof MappingInProgressMapperNodeState
			|| this.state instanceof MappingSucceededMapperNodeState
			|| this.state instanceof NoInputImageMapperNodeState
			|| this.state instanceof NoInputImageAndNoMapperMapperNodeState
			|| this.state instanceof NoMapperMapperNodeState
		) {
			this.state = this.state.unsetInputNode(this.outputNodes);
		}
	}
	public setInputNodeWithInputImage(
		inputImage: ImageData,
		inputNode: SupportedInputNode,
	): void {
		this.state = this.state.setInputNodeWithInputImage(
			inputImage,
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
		if (
			this.state instanceof MappingInProgressMapperNodeState
			|| this.state instanceof MappingSucceededMapperNodeState
			|| this.state instanceof NoInputImageMapperNodeState
			|| this.state instanceof NoInputImageAndNoMapperMapperNodeState
			|| this.state instanceof NoMapperMapperNodeState
		) {
			this.state = this.state.setInputImage(inputImage, this.outputNodes);
		}
	}
}
