import type {SupportedInputNode} from "../../../../../SupportedInputNode.ts";
import type {SupportedOutputNode} from "../../../../../SupportedOutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {MappingInProgressMapperNodeState} from "../mapping-in-progress/MappingInProgressMapperNodeState.ts";
import {NoInputImageMapperNodeState} from "../no-input-image/NoInputImageMapperNodeState.ts";
import {NoInputNodeMapperNodeState} from "../no-input-node/NoInputNodeMapperNodeState.ts";
import {NoMapperMapperNodeState} from "../no-mapper/NoMapperMapperNodeState.ts";
export class MappingSucceededMapperNodeState extends MapperNodeState {
	public constructor(
		inputImage: ImageData,
		inputNode: SupportedInputNode,
		mapper: Mapper,
		outputImage: ImageData,
	) {
		super("done");
		this.inputImage = inputImage;
		this.inputNode = inputNode;
		this.mapper = mapper;
		this.outputImage = outputImage;
	}
	private readonly inputImage: ImageData;
	public readonly inputNode: SupportedInputNode;
	public readonly mapper: Mapper;
	public readonly outputImage: ImageData;
	public override setMapper(
		newMapper: Mapper,
		outputNodes: readonly SupportedOutputNode[],
	): MappingSucceededMapperNodeState | MappingInProgressMapperNodeState {
		const generator = newMapper.map(this.inputImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputImage(generatorResult.value);
			}
			return new MappingSucceededMapperNodeState(
				this.inputImage,
				this.inputNode,
				newMapper,
				generatorResult.value,
			);
		} else {
			for (const outputNode of outputNodes) {
				outputNode.unsetInputImage();
			}
			return new MappingInProgressMapperNodeState(
				generator,
				this.inputImage,
				this.inputNode,
				newMapper,
				generatorResult.value,
			);
		}
	}
	public unsetInputImage(
		outputNodes: readonly SupportedOutputNode[],
	): NoInputImageMapperNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputImage();
		}
		return new NoInputImageMapperNodeState(this.inputNode, this.mapper);
	}
	public unsetInputNode(
		outputNodes: readonly SupportedOutputNode[],
	): NoInputNodeMapperNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputImage();
		}
		return new NoInputNodeMapperNodeState(this.mapper);
	}
	public unsetMapper(
		outputNodes: readonly SupportedOutputNode[],
	): NoMapperMapperNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputImage();
		}
		return new NoMapperMapperNodeState(this.inputImage, this.inputNode);
	}
	public setInputImage(
		newInputImage: ImageData,
		outputNodes: readonly SupportedOutputNode[],
	): MappingSucceededMapperNodeState | MappingInProgressMapperNodeState {
		const generator = this.mapper.map(newInputImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputImage(generatorResult.value);
			}
			return new MappingSucceededMapperNodeState(
				newInputImage,
				this.inputNode,
				this.mapper,
				generatorResult.value,
			);
		} else {
			for (const outputNode of outputNodes) {
				outputNode.unsetInputImage();
			}
			return new MappingInProgressMapperNodeState(
				generator,
				newInputImage,
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
			for (const outputNode of outputNodes) {
				outputNode.unsetInputImage();
			}
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
		for (const outputNode of outputNodes) {
			outputNode.unsetInputImage();
		}
		return new NoInputImageMapperNodeState(newInputNode, this.mapper);
	}
}
