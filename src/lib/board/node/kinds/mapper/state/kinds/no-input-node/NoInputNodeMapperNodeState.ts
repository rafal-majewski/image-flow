import type {SupportedInputNode} from "../../../../../SupportedInputNode.ts";
import type {SupportedOutputNode} from "../../../../../SupportedOutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {MappingInProgressMapperNodeState} from "../mapping-in-progress/MappingInProgressMapperNodeState.ts";
import {MappingSucceededMapperNodeState} from "../mapping-succeeded/MappingSucceededMapperNodeState.ts";
import {NoInputImageMapperNodeState} from "../no-input-image/NoInputImageMapperNodeState.ts";
import {NoInputNodeAndNoMapperMapperNodeState} from "../no-input-node-and-no-mapper/NoInputNodeAndNoMapperMapperNodeState.ts";
export class NoInputNodeMapperNodeState extends MapperNodeState {
	public constructor(mapper: Mapper) {
		super("unconfigured");
		this.mapper = mapper;
	}
	public readonly mapper: Mapper;
	public override setMapper(
		newMapper: Mapper,
		outputNodes: readonly SupportedInputNode[],
	): NoInputNodeMapperNodeState {
		return new NoInputNodeMapperNodeState(newMapper);
	}
	public unsetMapper(
		outputNodes: readonly SupportedInputNode[],
	): NoInputNodeAndNoMapperMapperNodeState {
		return new NoInputNodeAndNoMapperMapperNodeState();
	}
	public override setInputNodeWithInputImage(
		inputImage: ImageData,
		inputNode: SupportedInputNode,
		outputNodes: readonly SupportedOutputNode[],
	): MappingSucceededMapperNodeState | MappingInProgressMapperNodeState {
		const generator = this.mapper.map(inputImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputImage(generatorResult.value);
			}
			return new MappingSucceededMapperNodeState(
				inputImage,
				inputNode,
				this.mapper,
				generatorResult.value,
			);
		} else {
			return new MappingInProgressMapperNodeState(
				generator,
				inputImage,
				inputNode,
				this.mapper,
				generatorResult.value,
			);
		}
	}
	public override setInputNodeWithoutInputImage(
		inputNode: SupportedInputNode,
		outputNodes: readonly SupportedInputNode[],
	): NoInputImageMapperNodeState {
		return new NoInputImageMapperNodeState(inputNode, this.mapper);
	}
}
