import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {InstantNoInputNodeAndNoMapperMapperNodeState} from "../instant-no-input-node-and-no-mapper/InstantNoInputNodeAndNoMapperMapperNodeState.ts";
import {AnimatedNoInputNodeMapperNodeState} from "../animated-no-input-node/AnimatedNoInputNodeMapperNodeState.ts";
import {AnimatedNoMapperMapperNodeState} from "../animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
import {ManualNoInputNodeAndNoMapperMapperNodeState} from "../manual-no-input-node-and-no-mapper/ManualNoInputNodeAndNoMapperMapperNodeState.ts";
import {AnimatedNoInputNodeImageAndNoMapperMapperNodeState} from "../animated-no-input-node-image-and-no-mapper/AnimatedNoInputNodeImageAndNoMapperMapperNodeState.ts";
export class AnimatedNoInputNodeAndNoMapperMapperNodeState extends MapperNodeState {
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoInputNodeAndNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputNodeAndNoMapperMapperNodeState(
			newIntervalId,
			newIntervalIntervalSeconds,
		);
	}
	public override setInputNodeWithImage(
		thisNode: MapperNode,
		inputNode: Node,
		inputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): AnimatedNoMapperMapperNodeState {
		return new AnimatedNoMapperMapperNodeState(
			inputNode,
			inputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setMapper(
		mapper: Mapper,
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeMapperNodeState {
		return new AnimatedNoInputNodeMapperNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
			mapper,
		);
	}
	public override setInputNodeWithoutImage(
		thisNode: MapperNode,
		inputNode: Node,
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeImageAndNoMapperMapperNodeState {
		return new AnimatedNoInputNodeImageAndNoMapperMapperNodeState(
			inputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
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
		clearInterval(this.intervalId);
		return new InstantNoInputNodeAndNoMapperMapperNodeState();
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputNodeAndNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new ManualNoInputNodeAndNoMapperMapperNodeState(stepCount);
	}
	public override makeAnimated(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): MapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputNodeAndNoMapperMapperNodeState(
			newIntervalId,
			newIntervalIntervalSeconds,
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
	public constructor(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	) {
		super("unconfigured");
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
	}
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override resetOutputImage(outputNodes: readonly OutputNode[]): this {
		return this;
	}
}
