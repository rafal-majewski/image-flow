import type {Node} from "../../../../../Node.svelte.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import {InstantNoInputEdgeAndNoCombinerCombinerNodeState} from "../instant-no-input-node-and-no-combiner/InstantNoInputEdgeAndNoCombinerCombinerNodeState.ts";
import {AnimatedNoCombinerCombinerNodeState} from "../animated-no-combiner/AnimatedNoCombinerCombinerNodeState.ts";
import {ManualNoInputEdgeAndNoCombinerCombinerNodeState} from "../manual-no-input-node-and-no-combiner/ManualNoInputEdgeAndNoCombinerCombinerNodeState.ts";
import {AnimatedNoInputImageAndNoCombinerCombinerNodeState} from "../animated-no-input-node-image-and-no-combiner/AnimatedNoInputImageAndNoCombinerCombinerNodeState.ts";
import type {OutputEdge} from "../../../../../../edge/types/output/OutputEdge.ts";
import type {InputEdge} from "../../../../../../edge/types/input/InputEdge.ts";
export class AnimatedNoFirstInputImageAndNoCombinerCombinerNodeState extends CombinerNodeState {
	public constructor(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		secondInputEdge: InputEdge,
		secondInputEdgeImage: ImageData,
	) {
		super("unconfigured");
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
		this.secondInputEdge = secondInputEdge;
		this.secondInputEdgeImage = secondInputEdgeImage;
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
	): CombinerNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputEdgeAndNoCombinerCombinerNodeState(
			newIntervalId,
			newIntervalIntervalSeconds,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputEdgeAndNoCombinerCombinerNodeState {
		clearInterval(this.intervalId);
		return new InstantNoInputEdgeAndNoCombinerCombinerNodeState();
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputEdgeAndNoCombinerCombinerNodeState {
		clearInterval(this.intervalId);
		return new ManualNoInputEdgeAndNoCombinerCombinerNodeState(stepCount);
	}
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	private readonly secondInputEdge: InputEdge;
	private readonly secondInputEdgeImage: ImageData;
	public override setCombiner(
		combiner: Combiner,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputEdgeCombinerNodeState {
		return new AnimatedNoInputEdgeCombinerNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
			combiner,
		);
	}
	public override setInputEdgeWithImage(
		thisNode: CombinerNode,
		inputNode: Node,
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoCombinerCombinerNodeState {
		return new AnimatedNoCombinerCombinerNodeState(
			inputNode,
			inputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setInputEdgeWithoutImage(
		thisNode: CombinerNode,
		inputNode: Node,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageAndNoCombinerCombinerNodeState {
		return new AnimatedNoInputImageAndNoCombinerCombinerNodeState(
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
	): AnimatedNoInputEdgeAndNoCombinerCombinerNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputEdgeAndNoCombinerCombinerNodeState(
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
	): this {
		return this;
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
