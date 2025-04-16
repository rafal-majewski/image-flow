import type {OutputNode} from "../../../../../OutputNode.ts";
import type {SupportedInputNode} from "../../../../../SupportedInputNode.ts";
import type {SupportedNode} from "../../../../../SupportedNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
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
		outputNodes: readonly OutputNode[],
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
	public override unsetInputImage(
		outputNodes: readonly OutputNode[],
	): NoInputImageMapperNodeState {
		return new NoInputImageMapperNodeState(this.inputNode, this.mapper);
	}
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): NoInputNodeMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new NoInputNodeMapperNodeState(this.mapper);
	}
	public override unsetMapper(
		outputNodes: readonly OutputNode[],
	): NoMapperMapperNodeState {
		return new NoMapperMapperNodeState(this.inputImage, this.inputNode);
	}
	public override setInputImage(
		newInputImage: ImageData,
		outputNodes: readonly OutputNode[],
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
		return new NoInputImageMapperNodeState(newInputNode, this.mapper);
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
	): this | MappingSucceededMapperNodeState | MappingInProgressMapperNodeState {
		if (stepCountLeft > 0) {
			console.log(stepCountLeft);
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
				const newState = new MappingInProgressMapperNodeState(
					this.generator,
					this.inputImage,
					this.inputNode,
					this.mapper,
					generatorResult.value,
				);
				return newState.doManualSteps(stepCountLeft - 1, outputNodes);
			}
		} else {
			return this;
		}
	}
	public override doAnimatedStep(
		outputNodes: readonly OutputNode[],
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
	public override doInstantSteps(
		outputNodes: readonly OutputNode[],
	): MappingSucceededMapperNodeState {
		for (;;) {
			const generatorResult = this.generator.next();
			if (generatorResult.done) {
				return new MappingSucceededMapperNodeState(
					this.inputImage,
					this.inputNode,
					this.mapper,
					generatorResult.value,
				);
			}
		}
	}
}
