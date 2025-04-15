import type {OutputNode} from "../../../../../OutputNode.ts";
import type {SupportedInputNode} from "../../../../../SupportedInputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {NoInputImageMapperNodeState} from "../no-input-image/NoInputImageMapperNodeState.ts";
import {NoInputNodeAndNoMapperMapperNodeState} from "../no-input-node-and-no-mapper/NoInputNodeAndNoMapperMapperNodeState.ts";
import {NoMapperMapperNodeState} from "../no-mapper/NoMapperMapperNodeState.ts";
export class NoInputImageAndNoMapperMapperNodeState extends MapperNodeState {
	public constructor(inputNode: SupportedInputNode) {
		super("unconfigured");
		this.inputNode = inputNode;
	}
	public readonly inputNode: SupportedInputNode;
	public override setMapper(
		mapper: Mapper,
		outputNodes: readonly OutputNode[],
	): NoInputImageMapperNodeState {
		return new NoInputImageMapperNodeState(this.inputNode, mapper);
	}
	public override unsetInputNode(
		outputNodes: readonly OutputNode[],
	): NoInputNodeAndNoMapperMapperNodeState {
		return new NoInputNodeAndNoMapperMapperNodeState();
	}
	public override setInputImage(
		inputImage: ImageData,
		outputNodes: readonly OutputNode[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(inputImage, this.inputNode);
	}
	public override setInputNodeWithInputImage(
		newInputNode: SupportedInputNode,
		newInputImage: ImageData,
		outputNodes: readonly OutputNode[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(newInputImage, newInputNode);
	}
	public override setInputNodeWithoutInputImage(
		newInputNode: SupportedInputNode,
		outputNodes: readonly OutputNode[],
	): NoInputImageAndNoMapperMapperNodeState {
		return new NoInputImageAndNoMapperMapperNodeState(newInputNode);
	}
	public override disconnect(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): NoInputNodeAndNoMapperMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNode();
		}
		return new NoInputNodeAndNoMapperMapperNodeState();
	}
	public override unsetInputImage(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override unsetMapper(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override connectOutputNode(
		thisNode: MapperNode,
		outputNodeToConnect: OutputNode,
	): void {
		outputNodeToConnect.setInputNodeWithoutInputImage(thisNode);
	}
	public override doSteps(
		stepCountLeft: number,
		outputNodes: readonly OutputNode[],
	): this {
		return this;
	}
}
