import type {OutputNode} from "../../../../../OutputNode.ts";
import type {SupportedInputNode} from "../../../../../SupportedInputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
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
		outputNodes: readonly OutputNode[],
	): NoInputNodeMapperNodeState {
		return new NoInputNodeMapperNodeState(newMapper);
	}
	public override unsetMapper(
		outputNodes: readonly OutputNode[],
	): NoInputNodeAndNoMapperMapperNodeState {
		return new NoInputNodeAndNoMapperMapperNodeState();
	}
	public override setInputNodeWithInputImage(
		inputNode: SupportedInputNode,
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
		outputNodes: readonly OutputNode[],
	): NoInputImageMapperNodeState {
		return new NoInputImageMapperNodeState(inputNode, this.mapper);
	}
	public override disconnect(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): this {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNode();
		}
		return this;
	}
	public override unsetInputNode(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override setInputImage(
		inputImage: ImageData,
		outputNodes: readonly OutputNode[],
	): this {
		return this;
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
