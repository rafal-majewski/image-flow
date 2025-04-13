import type {SupportedInputNode} from "../../../../../SupportedInputNode.ts";
import type {SupportedNode} from "../../../../../SupportedNode.ts";
import type {SupportedOutputNode} from "../../../../../SupportedOutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {MappingSucceededMapperNodeState} from "../mapping-succeeded/MappingSucceededMapperNodeState.ts";
import {NoInputImageMapperNodeState} from "../no-input-image/NoInputImageMapperNodeState.ts";
import {NoInputNodeMapperNodeState} from "../no-input-node/NoInputNodeMapperNodeState.ts";
import {NoMapperMapperNodeState} from "../no-mapper/NoMapperMapperNodeState.ts";
export class MappingInProgressMapperNodeState extends MapperNodeState {
	public constructor(
		generator: Generator<ImageData, ImageData, void>,
		inputImage: ImageData,
		inputNode: SupportedNode,
		mapper: Mapper,
		outputImage: ImageData,
	) {
		super("working");
		this.generator = generator;
		this.inputImage = inputImage;
		this.inputNode = inputNode;
		this.mapper = mapper;
		this.outputImage = outputImage;
	}
	private readonly generator: Generator<ImageData, ImageData, void>;
	private readonly inputImage: ImageData;
	public readonly inputNode: SupportedInputNode;
	public readonly mapper: Mapper;
	public readonly outputImage: ImageData;
	public override setMapper(
		newMapper: Mapper,
		outputNodes: readonly SupportedOutputNode[],
	): MappingInProgressMapperNodeState | MappingSucceededMapperNodeState {
		const newGenerator = newMapper.map(this.inputImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputImage(newGeneratorResult.value);
			}
			return new MappingSucceededMapperNodeState(
				this.inputImage,
				this.inputNode,
				newMapper,
				newGeneratorResult.value,
			);
		} else {
			return new MappingInProgressMapperNodeState(
				newGenerator,
				this.inputImage,
				this.inputNode,
				newMapper,
				newGeneratorResult.value,
			);
		}
	}
	public unsetInputImage(
		outputNodes: readonly SupportedOutputNode[],
	): NoInputImageMapperNodeState {
		return new NoInputImageMapperNodeState(this.inputNode, this.mapper);
	}
	public unsetInputNode(
		outputNodes: readonly SupportedOutputNode[],
	): NoInputNodeMapperNodeState {
		return new NoInputNodeMapperNodeState(this.mapper);
	}
	public unsetMapper(
		outputNodes: readonly SupportedOutputNode[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(this.inputImage, this.inputNode);
	}
	public setInputImage(
		newInputImage: ImageData,
		outputNodes: readonly SupportedOutputNode[],
	): MappingSucceededMapperNodeState | MappingInProgressMapperNodeState {
		const newGenerator = this.mapper.map(newInputImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputImage(newGeneratorResult.value);
			}
			return new MappingSucceededMapperNodeState(
				newInputImage,
				this.inputNode,
				this.mapper,
				newGeneratorResult.value,
			);
		} else {
			return new MappingInProgressMapperNodeState(
				newGenerator,
				newInputImage,
				this.inputNode,
				this.mapper,
				newGeneratorResult.value,
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
	public doStep(
		outputNodes: readonly SupportedOutputNode[],
	): MappingInProgressMapperNodeState | MappingSucceededMapperNodeState {
		const generatorResult = this.generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputImage(generatorResult.value);
			}
			return new MappingSucceededMapperNodeState(
				this.inputImage,
				this.inputNode,
				this.mapper,
				generatorResult.value,
			);
		} else {
			return new MappingInProgressMapperNodeState(
				this.generator,
				this.inputImage,
				this.inputNode,
				this.mapper,
				generatorResult.value,
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
