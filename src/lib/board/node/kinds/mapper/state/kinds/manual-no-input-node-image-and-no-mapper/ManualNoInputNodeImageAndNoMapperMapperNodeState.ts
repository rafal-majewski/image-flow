import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualNoMapperMapperNodeState} from "../manual-no-mapper/ManualNoMapperMapperNodeState.ts";
import {ManualNoInputNodeImageMapperNodeState} from "../manual-no-input-node-image/ManualNoInputNodeImageMapperNodeState.ts";
import {ManualNoInputNodeMapperNodeState} from "../manual-no-input-node/ManualNoInputNodeMapperNodeState.ts";
import {ManualNoInputNodeAndNoMapperMapperNodeState} from "../manual-no-input-node-and-no-mapper/ManualNoInputNodeAndNoMapperMapperNodeState.ts";
import {InstantNoInputNodeImageAndNoMapperMapperNodeState} from "../instant-no-input-node-image-and-no-mapper/InstantNoInputNodeImageAndNoMapperMapperNodeState.ts";
import {AnimatedNoInputNodeImageAndNoMapperMapperNodeState} from "../animated-no-input-node-image-and-no-mapper/AnimatedNoInputNodeImageAndNoMapperMapperNodeState.ts";
export class ManualNoInputNodeImageAndNoMapperMapperNodeState extends MapperNodeState {
	public override setStepCount(
		newStepCount: number,
	): ManualNoInputNodeImageAndNoMapperMapperNodeState {
		return new ManualNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
			this.stepCount,
		);
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
		newInputNode: Node,
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeImageAndNoMapperMapperNodeState {
		return new ManualNoInputNodeImageAndNoMapperMapperNodeState(
			newInputNode,
			this.stepCount,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): ManualNoMapperMapperNodeState {
		return new ManualNoMapperMapperNodeState(
			this.inputNode,
			inputNodeImage,
			this.stepCount,
		);
	}
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeAndNoMapperMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new ManualNoInputNodeAndNoMapperMapperNodeState(this.stepCount);
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
		return new InstantNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
		);
	}
	public override makeManual(
		newStepCount: number,
	): ManualNoInputNodeImageAndNoMapperMapperNodeState {
		return new ManualNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
			newStepCount,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoInputNodeImageAndNoMapperMapperNodeState {
		return new AnimatedNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
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
	public constructor(inputNode: Node, stepCount: number) {
		super("unconfigured");
		this.inputNode = inputNode;
		this.stepCount = stepCount;
	}
	private readonly inputNode: Node;
	public readonly stepCount: number;
	public override resetOutputImage(outputNodes: readonly OutputNode[]): this {
		return this;
	}
}
