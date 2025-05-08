import type {Node} from "../../../../../Node.svelte.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {OutputNode} from "../../../../../OutputNode.ts";
import {InstantMappingSucceededMapperNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import {InstantNoInputNodeImageMapperNodeState} from "../instant-no-input-node-image/InstantNoInputNodeImageMapperNodeState.ts";
import {InstantNoInputNodeAndNoMapperMapperNodeState} from "../instant-no-input-node-and-no-mapper/InstantNoInputNodeAndNoMapperMapperNodeState.ts";
import {ManualNoInputNodeMapperNodeState} from "../manual-no-input-node/ManualNoInputNodeMapperNodeState.ts";
import {AnimatedNoInputNodeMapperNodeState} from "../animated-no-input-node/AnimatedNoInputNodeMapperNodeState.ts";
export class InstantNoInputNodeMapperNodeState extends MapperNodeState {
	public override doManualSteps(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override doAnimatedStep(outputNodes: readonly OutputNode[]): this {
		return this;
	}
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
		inputNode: Node,
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
					inputNode,
					inputNodeImage,
					this.mapper,
					generatorResult.value,
				);
			}
		}
	}
	public override setMapper(
		newMapper: Mapper,
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeMapperNodeState {
		return new InstantNoInputNodeMapperNodeState(newMapper);
	}
	public override setInputNodeWithoutImage(
		thisNode: MapperNode,
		inputNode: Node,
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeImageMapperNodeState {
		return new InstantNoInputNodeImageMapperNodeState(inputNode, this.mapper);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): this {
		return this;
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
	): InstantNoInputNodeAndNoMapperMapperNodeState {
		return new InstantNoInputNodeAndNoMapperMapperNodeState();
	}
	public override makeInstant(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputNodeMapperNodeState {
		return new ManualNoInputNodeMapperNodeState(this.mapper, stepCount);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoInputNodeMapperNodeState {
		return new AnimatedNoInputNodeMapperNodeState(
			intervalId,
			intervalIntervalSeconds,
			this.mapper,
		);
	}
	public override updateOutputNodeAfterAdding(
		thisNode: MapperNode,
		outputNodeToUpdate: OutputNode,
	): void {
		outputNodeToUpdate.setInputNodeWithoutImage(thisNode);
	}
	public constructor(mapper: Mapper) {
		super("unconfigured");
		this.mapper = mapper;
	}
	public readonly mapper: Mapper;
	public override resetOutputImage(outputNodes: readonly OutputNode[]): this {
		return this;
	}
}
