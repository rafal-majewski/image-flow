import type {SupportedInputNode} from "../../../../../SupportedInputNode.ts";
import type {SupportedOutputNode} from "../../../../../SupportedOutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {MappingInProgressMapperNodeState} from "../mapping-in-progress/MappingInProgressMapperNodeState.ts";
import {MappingSucceededMapperNodeState} from "../mapping-succeeded/MappingSucceededMapperNodeState.ts";
import {NoInputImageAndNoMapperMapperNodeState} from "../no-input-image-and-no-mapper/NoInputImageAndNoMapperMapperNodeState.ts";
import {NoInputNodeMapperNodeState} from "../no-input-node/NoInputNodeMapperNodeState.ts";
export class NoInputImageMapperNodeState extends MapperNodeState {
	public constructor(inputNode: SupportedInputNode, mapper: Mapper) {
		super("idling");
		this.inputNode = inputNode;
		this.mapper = mapper;
	}
	public readonly inputNode: SupportedInputNode;
	public readonly mapper: Mapper;
	public override setMapper(
		newMapper: Mapper,
		outputNodes: readonly SupportedOutputNode[],
	): NoInputImageMapperNodeState {
		return new NoInputImageMapperNodeState(this.inputNode, newMapper);
	}
	public unsetMapper(
		outputNodes: readonly SupportedOutputNode[],
	): NoInputImageAndNoMapperMapperNodeState {
		return new NoInputImageAndNoMapperMapperNodeState(this.inputNode);
	}
	public unsetInputNode(
		outputNodes: readonly SupportedOutputNode[],
	): NoInputNodeMapperNodeState {
		return new NoInputNodeMapperNodeState(this.mapper);
	}
	public setInputImage(
		inputImage: ImageData,
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
				this.inputNode,
				this.mapper,
				generatorResult.value,
			);
		} else {
			return new MappingInProgressMapperNodeState(
				generator,
				inputImage,
				this.inputNode,
				this.mapper,
				generatorResult.value,
			);
		}
	}
	public override setInputNodeWithInputImage(
		newInputImage: ImageData,
		newInputNode: SupportedInputNode,
		outputNodes: readonly SupportedOutputNode[],
	): MappingInProgressMapperNodeState | MappingSucceededMapperNodeState {
		const newGenerator = this.mapper.map(newInputImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputImage(newGeneratorResult.value);
			}
			return new MappingSucceededMapperNodeState(
				newInputImage,
				newInputNode,
				this.mapper,
				newGeneratorResult.value,
			);
		} else {
			return new MappingInProgressMapperNodeState(
				newGenerator,
				newInputImage,
				newInputNode,
				this.mapper,
				newGeneratorResult.value,
			);
		}
	}
	public override setInputNodeWithoutInputImage(
		newInputNode: SupportedInputNode,
		outputNodes: readonly SupportedOutputNode[],
	): NoInputImageMapperNodeState {
		return new NoInputImageMapperNodeState(newInputNode, this.mapper);
	}
}
