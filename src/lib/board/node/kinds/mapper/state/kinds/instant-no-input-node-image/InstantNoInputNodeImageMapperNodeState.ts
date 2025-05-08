import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {InstantMappingSucceededMapperNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import {InstantNoInputNodeImageAndNoMapperMapperNodeState} from "../instant-no-input-node-image-and-no-mapper/InstantNoInputNodeImageAndNoMapperMapperNodeState.ts";
import {ManualNoInputNodeImageMapperNodeState} from "../manual-no-input-node-image/ManualNoInputNodeImageMapperNodeState.ts";
import {AnimatedNoInputNodeImageMapperNodeState} from "../animated-no-input-node-image/AnimatedNoInputNodeImageMapperNodeState.ts";
export class InstantNoInputNodeImageMapperNodeState extends MapperNodeState {
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override setInputNodeWithImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): InstantMappingSucceededMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		const generator = this.mapper.map(newInputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededMapperNodeState(
					newInputNode,
					newInputNodeImage,
					this.mapper,
					generatorResult.value,
				);
			}
		}
	}
	public override setMapper(
		newMapper: Mapper,
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeImageMapperNodeState {
		return new InstantNoInputNodeImageMapperNodeState(
			this.inputNode,
			newMapper,
		);
	}
	public override setInputNodeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeImageMapperNodeState {
		return new InstantNoInputNodeImageMapperNodeState(
			newInputNode,
			this.mapper,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): InstantMappingSucceededMapperNodeState {
		const generator = this.mapper.map(inputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededMapperNodeState(
					this.inputNode,
					inputNodeImage,
					this.mapper,
					generatorResult.value,
				);
			}
		}
	}
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): this {
		return this;
	}
	public override unsetInputNodeImage(
		outputNodes: readonly OutputNode[],
	): this {
		return this;
	}
	public override unsetMapper(
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeImageAndNoMapperMapperNodeState {
		return new InstantNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
		);
	}
	public override makeInstant(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputNodeImageMapperNodeState {
		return new ManualNoInputNodeImageMapperNodeState(
			this.inputNode,
			this.mapper,
			stepCount,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoInputNodeImageMapperNodeState {
		return new AnimatedNoInputNodeImageMapperNodeState(
			this.inputNode,
			intervalId,
			intervalIntervalSeconds,
			this.mapper,
		);
	}
	public override doManualSteps(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override doAnimatedStep(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override updateOutputNodeAfterAdding(
		thisNode: MapperNode,
		outputNodeToUpdate: OutputNode,
	): void {
		outputNodeToUpdate.setInputNodeWithoutImage(thisNode);
	}
	private readonly inputNode: Node;
	public readonly mapper: Mapper;
	public constructor(inputNode: Node, mapper: Mapper) {
		super("idling");
		this.inputNode = inputNode;
		this.mapper = mapper;
	}
	public override resetOutputImage(outputNodes: readonly OutputNode[]): this {
		return this;
	}
}
