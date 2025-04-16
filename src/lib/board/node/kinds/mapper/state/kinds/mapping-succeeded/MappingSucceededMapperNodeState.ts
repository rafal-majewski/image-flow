import type {OutputNode} from "../../../../../OutputNode.ts";
import type {SupportedInputNode} from "../../../../../SupportedInputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
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
		outputNodes: readonly OutputNode[],
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
	public override unsetInputImage(
		outputNodes: readonly OutputNode[],
	): NoInputImageMapperNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputImage();
		}
		return new NoInputImageMapperNodeState(this.inputNode, this.mapper);
	}
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): NoInputNodeMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		for (const outputNode of outputNodes) {
			outputNode.unsetInputImage();
		}
		return new NoInputNodeMapperNodeState(this.mapper);
	}
	public override unsetMapper(
		outputNodes: readonly OutputNode[],
	): NoMapperMapperNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputImage();
		}
		return new NoMapperMapperNodeState(this.inputImage, this.inputNode);
	}
	public override setInputImage(
		newInputImage: ImageData,
		outputNodes: readonly OutputNode[],
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
		thisNode: MapperNode,
		newInputNode: SupportedInputNode,
		newInputImage: ImageData,
		outputNodes: readonly OutputNode[],
	): MappingInProgressMapperNodeState | MappingSucceededMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
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
		thisNode: MapperNode,
		newInputNode: SupportedInputNode,
		outputNodes: readonly OutputNode[],
	): NoInputImageMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		for (const outputNode of outputNodes) {
			outputNode.unsetInputImage();
		}
		return new NoInputImageMapperNodeState(newInputNode, this.mapper);
	}
	public override connectOutputNode(
		thisNode: MapperNode,
		outputNodeToConnect: OutputNode,
	): void {
		outputNodeToConnect.setInputNodeWithInputImage(thisNode, this.outputImage);
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
