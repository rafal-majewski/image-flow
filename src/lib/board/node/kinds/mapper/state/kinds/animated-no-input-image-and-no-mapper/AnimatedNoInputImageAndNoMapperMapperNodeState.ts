import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {AnimatedNoMapperMapperNodeState} from "../animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {OutputEdge} from "../../../../../../edge/types/output/OutputEdge.ts";
import type {InputEdge} from "../../../../../../edge/types/input/InputEdge.ts";
export class AnimatedNoInputImageAndNoMapperMapperNodeState extends MapperNodeState {
	public constructor(
		inputEdge: InputEdge,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	) {
		super("unconfigured");
		this.inputEdge = inputEdge;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
	}
	public override doAnimatedStep(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override doManualSteps(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	private readonly inputEdge: InputEdge;
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override makeAnimated(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoInputImageAndNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputImageAndNoMapperMapperNodeState(
			this.inputEdge,
			newIntervalId,
			newIntervalIntervalSeconds,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageAndNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new InstantNoInputImageAndNoMapperMapperNodeState(this.inputEdge);
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputImageAndNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new ManualNoInputImageAndNoMapperMapperNodeState(
			this.inputEdge,
			stepCount,
		);
	}
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setInputEdgeWithImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoMapperMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new AnimatedNoMapperMapperNodeState(
			newInputNode,
			newInputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageAndNoMapperMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new AnimatedNoInputImageAndNoMapperMapperNodeState(
			newInputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoMapperMapperNodeState {
		return new AnimatedNoMapperMapperNodeState(
			this.inputEdge,
			inputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoInputImageAndNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputImageAndNoMapperMapperNodeState(
			this.inputEdge,
			newIntervalId,
			newIntervalIntervalSeconds,
		);
	}
	public override setMapper(
		mapper: Mapper,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageMapperNodeState {
		return new AnimatedNoInputImageMapperNodeState(
			this.inputEdge,
			this.intervalId,
			this.intervalIntervalSeconds,
			mapper,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetInputEdge(
		outputEdges: readonly OutputEdge[],
	): MapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new AnimatedNoInputEdgeAndNoMapperMapperNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
		);
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
