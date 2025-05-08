import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {AnimatedNoInputNodeAndNoMapperMapperNodeState} from "../animated-no-input-node-and-no-mapper/AnimatedNoInputNodeAndNoMapperMapperNodeState.ts";
import {AnimatedNoMapperMapperNodeState} from "../animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualNoInputNodeImageAndNoMapperMapperNodeState} from "../manual-no-input-node-image-and-no-mapper/ManualNoInputNodeImageAndNoMapperMapperNodeState.ts";
import {InstantNoInputNodeImageAndNoMapperMapperNodeState} from "../instant-no-input-node-image-and-no-mapper/InstantNoInputNodeImageAndNoMapperMapperNodeState.ts";
import {AnimatedNoInputNodeImageMapperNodeState} from "../animated-no-input-node-image/AnimatedNoInputNodeImageMapperNodeState.ts";
export class AnimatedNoInputNodeImageAndNoMapperMapperNodeState extends MapperNodeState {
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoInputNodeImageAndNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
			newIntervalId,
			newIntervalIntervalSeconds,
		);
	}
	public override setInputNodeWithImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): AnimatedNoMapperMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new AnimatedNoMapperMapperNodeState(
			newInputNode,
			newInputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setMapper(
		mapper: Mapper,
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeImageMapperNodeState {
		return new AnimatedNoInputNodeImageMapperNodeState(
			this.inputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
			mapper,
		);
	}
	public override setInputNodeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeImageAndNoMapperMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new AnimatedNoInputNodeImageAndNoMapperMapperNodeState(
			newInputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): AnimatedNoMapperMapperNodeState {
		return new AnimatedNoMapperMapperNodeState(
			this.inputNode,
			inputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new AnimatedNoInputNodeAndNoMapperMapperNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
		);
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
	): InstantNoInputNodeImageAndNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new InstantNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
		);
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputNodeImageAndNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new ManualNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
			stepCount,
		);
	}
	public override makeAnimated(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoInputNodeImageAndNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
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
		inputNode: Node,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	) {
		super("unconfigured");
		this.inputNode = inputNode;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
	}
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	private readonly inputNode: Node;
	public override resetOutputImage(outputNodes: readonly OutputNode[]): this {
		return this;
	}
}
