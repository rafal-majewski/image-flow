import type {SupportedInputNode} from "../../../../../SupportedInputNode.ts";
import type {SupportedOutputNode} from "../../../../../SupportedOutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
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
		outputNodes: readonly SupportedOutputNode[],
	): NoInputImageMapperNodeState {
		return new NoInputImageMapperNodeState(this.inputNode, mapper);
	}
	public unsetInputNode(
		outputNodes: readonly SupportedOutputNode[],
	): NoInputNodeAndNoMapperMapperNodeState {
		return new NoInputNodeAndNoMapperMapperNodeState();
	}
	public setInputImage(
		inputImage: ImageData,
		outputNodes: readonly SupportedOutputNode[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(inputImage, this.inputNode);
	}
	public override setInputNodeWithInputImage(
		newInputImage: ImageData,
		newInputNode: SupportedInputNode,
		outputNodes: readonly SupportedOutputNode[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(newInputImage, newInputNode);
	}
	public override setInputNodeWithoutInputImage(
		newInputNode: SupportedInputNode,
		outputNodes: readonly SupportedOutputNode[],
	): NoInputImageAndNoMapperMapperNodeState {
		return new NoInputImageAndNoMapperMapperNodeState(newInputNode);
	}
}
