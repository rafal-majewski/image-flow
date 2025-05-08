import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualMappingInProgressMapperNodeState} from "../manual-mapping-in-progress/ManualMappingInProgressMapperNodeState.ts";
import {ManualMappingSucceededMapperNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
import {ManualNoInputNodeImageMapperNodeState} from "../manual-no-input-node-image/ManualNoInputNodeImageMapperNodeState.ts";
import {ManualNoInputNodeAndNoMapperMapperNodeState} from "../manual-no-input-node-and-no-mapper/ManualNoInputNodeAndNoMapperMapperNodeState.ts";
import {InstantNoInputNodeMapperNodeState} from "../instant-no-input-node/InstantNoInputNodeMapperNodeState.ts";
import {AnimatedNoInputNodeMapperNodeState} from "../animated-no-input-node/AnimatedNoInputNodeMapperNodeState.ts";
export class ManualNoInputNodeMapperNodeState extends MapperNodeState {
	public override setStepCount(
		newStepCount: number,
	): ManualNoInputNodeMapperNodeState {
		return new ManualNoInputNodeMapperNodeState(this.mapper, newStepCount);
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
	):
		| ManualMappingInProgressMapperNodeState
		| ManualMappingSucceededMapperNodeState {
		const newGenerator = this.mapper.map(inputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new ManualMappingSucceededMapperNodeState(
				inputNode,
				inputNodeImage,
				this.mapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualMappingInProgressMapperNodeState(
				newGenerator,
				inputNode,
				inputNodeImage,
				this.mapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		}
	}
	public override setMapper(
		newMapper: Mapper,
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeMapperNodeState {
		return new ManualNoInputNodeMapperNodeState(newMapper, this.stepCount);
	}
	public override setInputNodeWithoutImage(
		thisNode: MapperNode,
		inputNode: Node,
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeImageMapperNodeState {
		return new ManualNoInputNodeImageMapperNodeState(
			inputNode,
			this.mapper,
			this.stepCount,
		);
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
	): ManualNoInputNodeAndNoMapperMapperNodeState {
		return new ManualNoInputNodeAndNoMapperMapperNodeState(this.stepCount);
	}
	public override makeInstant(
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeMapperNodeState {
		return new InstantNoInputNodeMapperNodeState(this.mapper);
	}
	public override makeManual(
		newStepCount: number,
	): ManualNoInputNodeMapperNodeState {
		return new ManualNoInputNodeMapperNodeState(this.mapper, newStepCount);
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
	public constructor(mapper: Mapper, stepCount: number) {
		super("unconfigured");
		this.mapper = mapper;
		this.stepCount = stepCount;
	}
	public readonly mapper: Mapper;
	public readonly stepCount: number;
	public override resetOutputImage(outputNodes: readonly OutputNode[]): this {
		return this;
	}
}
