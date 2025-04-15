import type {OutputNode} from "../../../../../OutputNode.ts";
import type {SupportedInputNode} from "../../../../../SupportedInputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
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
		outputNodes: readonly OutputNode[],
	): NoInputImageMapperNodeState {
		return new NoInputImageMapperNodeState(this.inputNode, newMapper);
	}
	public override unsetMapper(
		outputNodes: readonly OutputNode[],
	): NoInputImageAndNoMapperMapperNodeState {
		return new NoInputImageAndNoMapperMapperNodeState(this.inputNode);
	}
	public override unsetInputNode(
		outputNodes: readonly OutputNode[],
	): NoInputNodeMapperNodeState {
		return new NoInputNodeMapperNodeState(this.mapper);
	}
	public override setInputImage(
		inputImage: ImageData,
		outputNodes: readonly OutputNode[],
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
		newInputNode: SupportedInputNode,
		newInputImage: ImageData,
		outputNodes: readonly OutputNode[],
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
		outputNodes: readonly OutputNode[],
	): NoInputImageMapperNodeState {
		return new NoInputImageMapperNodeState(newInputNode, this.mapper);
	}
	public override disconnect(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): NoInputNodeMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNode();
		}
		return new NoInputNodeMapperNodeState(this.mapper);
	}
	public override unsetInputImage(outputNodes: readonly OutputNode[]): this {
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
