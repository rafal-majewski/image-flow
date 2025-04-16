import type {OutputNode} from "../../../../../OutputNode.ts";
import type {SupportedInputNode} from "../../../../../SupportedInputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {NoInputImageAndNoMapperMapperNodeState} from "../no-input-image-and-no-mapper/NoInputImageAndNoMapperMapperNodeState.ts";
import {NoInputNodeMapperNodeState} from "../no-input-node/NoInputNodeMapperNodeState.ts";
import {NoMapperMapperNodeState} from "../no-mapper/NoMapperMapperNodeState.ts";
export class NoInputNodeAndNoMapperMapperNodeState extends MapperNodeState {
	public constructor() {
		super("unconfigured");
	}
	public override setMapper(
		mapper: Mapper,
		outputNodes: readonly OutputNode[],
	): NoInputNodeMapperNodeState {
		return new NoInputNodeMapperNodeState(mapper);
	}
	public override setInputNodeWithInputImage(
		thisNode: MapperNode,
		inputNode: SupportedInputNode,
		inputImage: ImageData,
		outputNodes: readonly OutputNode[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(inputImage, inputNode);
	}
	public override setInputNodeWithoutInputImage(
		thisNode: MapperNode,
		inputNode: SupportedInputNode,
		outputNodes: readonly OutputNode[],
	): NoInputImageAndNoMapperMapperNodeState {
		return new NoInputImageAndNoMapperMapperNodeState(inputNode);
	}
	public override setInputImage(
		inputImage: ImageData,
		outputNodes: readonly OutputNode[],
	): this {
		return this;
	}
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): this {
		return this;
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
	public override doManualSteps(
		stepCountLeft: number,
		outputNodes: readonly OutputNode[],
	): this {
		return this;
	}
	public override doAnimatedStep(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override doInstantSteps(outputNodes: readonly OutputNode[]): this {
		return this;
	}
}
