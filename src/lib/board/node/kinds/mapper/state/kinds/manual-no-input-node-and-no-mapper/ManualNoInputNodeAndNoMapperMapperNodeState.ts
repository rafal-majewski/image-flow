import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {ManualNoMapperMapperNodeState} from "../manual-no-mapper/ManualNoMapperMapperNodeState.ts";
import {ManualNoInputNodeMapperNodeState} from "../manual-no-input-node/ManualNoInputNodeMapperNodeState.ts";
import {ManualNoInputNodeImageAndNoMapperMapperNodeState} from "../manual-no-input-node-image-and-no-mapper/ManualNoInputNodeImageAndNoMapperMapperNodeState.ts";
import {InstantNoInputNodeAndNoMapperMapperNodeState} from "../instant-no-input-node-and-no-mapper/InstantNoInputNodeAndNoMapperMapperNodeState.ts";
import {AnimatedNoInputNodeAndNoMapperMapperNodeState} from "../animated-no-input-node-and-no-mapper/AnimatedNoInputNodeAndNoMapperMapperNodeState.ts";
export class ManualNoInputNodeAndNoMapperMapperNodeState extends MapperNodeState {
	public override setStepCount(
		newStepCount: number,
	): ManualNoInputNodeAndNoMapperMapperNodeState {
		return new ManualNoInputNodeAndNoMapperMapperNodeState(newStepCount);
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
	): ManualNoMapperMapperNodeState {
		return new ManualNoMapperMapperNodeState(
			inputNode,
			inputNodeImage,
			this.stepCount,
		);
	}
	public override setMapper(
		mapper: Mapper,
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeMapperNodeState {
		return new ManualNoInputNodeMapperNodeState(mapper, this.stepCount);
	}
	public override setInputNodeWithoutImage(
		thisNode: MapperNode,
		inputNode: Node,
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeImageAndNoMapperMapperNodeState {
		return new ManualNoInputNodeImageAndNoMapperMapperNodeState(
			inputNode,
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
	public override unsetMapper(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override makeInstant(
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeAndNoMapperMapperNodeState {
		return new InstantNoInputNodeAndNoMapperMapperNodeState();
	}
	public override makeManual(
		newStepCount: number,
	): ManualNoInputNodeAndNoMapperMapperNodeState {
		return new ManualNoInputNodeAndNoMapperMapperNodeState(newStepCount);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoInputNodeAndNoMapperMapperNodeState {
		return new AnimatedNoInputNodeAndNoMapperMapperNodeState(
			intervalId,
			intervalIntervalSeconds,
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
	public constructor(stepCount: number) {
		super("unconfigured");
		this.stepCount = stepCount;
	}
	public readonly stepCount: number;
}
