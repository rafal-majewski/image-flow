import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import {ManualNoCombinerCombinerNodeState} from "../manual-no-combiner/ManualNoCombinerCombinerNodeState.ts";
import {ManualNoInputEdgeCombinerNodeState} from "../manual-no-input-node/ManualNoInputEdgeCombinerNodeState.ts";
import {ManualNoInputImageAndNoCombinerCombinerNodeState} from "../manual-no-input-node-image-and-no-combiner/ManualNoInputImageAndNoCombinerCombinerNodeState.ts";
import {InstantNoInputEdgeAndNoCombinerCombinerNodeState} from "../instant-no-input-node-and-no-combiner/InstantNoInputEdgeAndNoCombinerCombinerNodeState.ts";
import {AnimatedNoInputEdgeAndNoCombinerCombinerNodeState} from "../animated-no-first-input-node-and-no-combiner/AnimatedNoFirstInputImageAndNoCombinerCombinerNodeState.ts";
export class ManualNoInputEdgeAndNoCombinerCombinerNodeState extends CombinerNodeState {
	public constructor(stepCount: number) {
		super("unconfigured");
		this.stepCount = stepCount;
	}
	public override doAnimatedStep(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override doManualSteps(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoInputEdgeAndNoCombinerCombinerNodeState {
		return new AnimatedNoInputEdgeAndNoCombinerCombinerNodeState(
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputEdgeAndNoCombinerCombinerNodeState {
		return new InstantNoInputEdgeAndNoCombinerCombinerNodeState();
	}
	public override makeManual(
		newStepCount: number,
	): ManualNoInputEdgeAndNoCombinerCombinerNodeState {
		return new ManualNoInputEdgeAndNoCombinerCombinerNodeState(newStepCount);
	}
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setCombiner(
		combiner: Combiner,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputEdgeCombinerNodeState {
		return new ManualNoInputEdgeCombinerNodeState(combiner, this.stepCount);
	}
	public override setInputEdgeWithImage(
		thisNode: CombinerNode,
		inputNode: Node,
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): ManualNoCombinerCombinerNodeState {
		return new ManualNoCombinerCombinerNodeState(
			inputNode,
			inputNodeImage,
			this.stepCount,
		);
	}
	public override setInputEdgeWithoutImage(
		thisNode: CombinerNode,
		inputNode: Node,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageAndNoCombinerCombinerNodeState {
		return new ManualNoInputImageAndNoCombinerCombinerNodeState(
			inputNode,
			this.stepCount,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): this {
		return this;
	}
	public override setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override setStepCount(
		newStepCount: number,
	): ManualNoInputEdgeAndNoCombinerCombinerNodeState {
		return new ManualNoInputEdgeAndNoCombinerCombinerNodeState(newStepCount);
	}
	public readonly stepCount: number;
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
