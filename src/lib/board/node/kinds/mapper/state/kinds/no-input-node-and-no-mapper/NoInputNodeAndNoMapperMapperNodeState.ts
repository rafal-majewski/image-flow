import type {SupportedInputNode} from "../../../../../SupportedInputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
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
		outputNodes: readonly SupportedInputNode[],
	): NoInputNodeMapperNodeState {
		return new NoInputNodeMapperNodeState(mapper);
	}
	public override setInputNodeWithInputImage(
		inputImage: ImageData,
		inputNode: SupportedInputNode,
		outputNodes: readonly SupportedInputNode[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(inputImage, inputNode);
	}
	public override setInputNodeWithoutInputImage(
		inputNode: SupportedInputNode,
		outputNodes: readonly SupportedInputNode[],
	): NoInputImageAndNoMapperMapperNodeState {
		return new NoInputImageAndNoMapperMapperNodeState(inputNode);
	}
}
