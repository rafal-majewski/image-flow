import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {InstantNoInputEdgeAndNoMapperMapperNodeState} from "../instant-no-input-node-and-no-mapper/InstantNoInputEdgeAndNoMapperMapperNodeState.ts";
import {AnimatedNoInputEdgeMapperNodeState} from "../animated-no-input-node/AnimatedNoInputEdgeMapperNodeState.ts";
import {AnimatedNoMapperMapperNodeState} from "../animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
import {ManualNoInputEdgeAndNoMapperMapperNodeState} from "../manual-no-input-node-and-no-mapper/ManualNoInputEdgeAndNoMapperMapperNodeState.ts";
import {AnimatedNoInputImageAndNoMapperMapperNodeState} from "../animated-no-input-node-image-and-no-mapper/AnimatedNoInputImageAndNoMapperMapperNodeState.ts";
export class AnimatedNoInputEdgeAndNoMapperMapperNodeState extends MapperNodeState {
	public constructor(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	) {
		super("unconfigured");
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
	}
	public override doAnimatedStep(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override doManualSteps(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override makeAnimated(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): MapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputEdgeAndNoMapperMapperNodeState(
			newIntervalId,
			newIntervalIntervalSeconds,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputEdgeAndNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new InstantNoInputEdgeAndNoMapperMapperNodeState();
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputEdgeAndNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new ManualNoInputEdgeAndNoMapperMapperNodeState(stepCount);
	}
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setInputEdgeWithImage(
		thisNode: MapperNode,
		inputNode: Node,
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoMapperMapperNodeState {
		return new AnimatedNoMapperMapperNodeState(
			inputNode,
			inputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		inputNode: Node,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageAndNoMapperMapperNodeState {
		return new AnimatedNoInputImageAndNoMapperMapperNodeState(
			inputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): this {
		return this;
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoInputEdgeAndNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputEdgeAndNoMapperMapperNodeState(
			newIntervalId,
			newIntervalIntervalSeconds,
		);
	}
	public override setMapper(
		mapper: Mapper,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputEdgeMapperNodeState {
		return new AnimatedNoInputEdgeMapperNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
			mapper,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetInputEdge(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override unsetInputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override unsetMapper(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: MapperNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
