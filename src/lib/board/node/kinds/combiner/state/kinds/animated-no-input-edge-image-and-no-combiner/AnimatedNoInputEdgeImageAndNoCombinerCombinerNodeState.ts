import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import {AnimatedNoInputEdgeAndNoCombinerCombinerNodeState} from "../animated-no-first-input-node-and-no-combiner/AnimatedNoFirstInputImageAndNoCombinerCombinerNodeState.ts";
import {AnimatedNoCombinerCombinerNodeState} from "../animated-no-combiner/AnimatedNoCombinerCombinerNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualNoInputImageAndNoCombinerCombinerNodeState} from "../manual-no-input-node-image-and-no-combiner/ManualNoInputImageAndNoCombinerCombinerNodeState.ts";
import {InstantNoInputImageAndNoCombinerCombinerNodeState} from "../instant-no-input-node-image-and-no-combiner/InstantNoInputImageAndNoCombinerCombinerNodeState.ts";
import {AnimatedNoInputImageCombinerNodeState} from "../animated-no-first-input-node-image/AnimatedNoFirstInputImageImageCombinerNodeState.ts";
export class AnimatedNoInputImageAndNoCombinerCombinerNodeState extends CombinerNodeState {
	public constructor(
		inputEdge: InputEdge,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	) {
		super("unconfigured");
		this.inputNode = inputNode;
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
	): AnimatedNoInputImageAndNoCombinerCombinerNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputImageAndNoCombinerCombinerNodeState(
			this.inputEdge,
			newIntervalId,
			newIntervalIntervalSeconds,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageAndNoCombinerCombinerNodeState {
		clearInterval(this.intervalId);
		return new InstantNoInputImageAndNoCombinerCombinerNodeState(
			this.inputEdge,
		);
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputImageAndNoCombinerCombinerNodeState {
		clearInterval(this.intervalId);
		return new ManualNoInputImageAndNoCombinerCombinerNodeState(
			this.inputEdge,
			stepCount,
		);
	}
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setCombiner(
		combiner: Combiner,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageCombinerNodeState {
		return new AnimatedNoInputImageCombinerNodeState(
			this.inputEdge,
			this.intervalId,
			this.intervalIntervalSeconds,
			combiner,
		);
	}
	public override setInputEdgeWithImage(
		thisNode: CombinerNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoCombinerCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new AnimatedNoCombinerCombinerNodeState(
			newInputNode,
			newInputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setInputEdgeWithoutImage(
		thisNode: CombinerNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageAndNoCombinerCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new AnimatedNoInputImageAndNoCombinerCombinerNodeState(
			newInputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoCombinerCombinerNodeState {
		return new AnimatedNoCombinerCombinerNodeState(
			this.inputEdge,
			inputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoInputImageAndNoCombinerCombinerNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputImageAndNoCombinerCombinerNodeState(
			this.inputEdge,
			newIntervalId,
			newIntervalIntervalSeconds,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetCombiner(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override unsetInputEdge(
		thisNode: CombinerNode,
		outputEdges: readonly OutputEdge[],
	): CombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new AnimatedNoInputEdgeAndNoCombinerCombinerNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override unsetInputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: CombinerNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
