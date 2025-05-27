import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {InstantNoCombinerCombinerNodeState} from "../instant-no-combiner/InstantNoCombinerCombinerNodeState.ts";
import {InstantNoInputEdgeCombinerNodeState} from "../instant-no-input-node/InstantNoInputEdgeCombinerNodeState.ts";
import {InstantNoInputImageAndNoCombinerCombinerNodeState} from "../instant-no-input-node-image-and-no-combiner/InstantNoInputImageAndNoCombinerCombinerNodeState.ts";
import {ManualNoInputEdgeAndNoCombinerCombinerNodeState} from "../manual-no-input-node-and-no-combiner/ManualNoInputEdgeAndNoCombinerCombinerNodeState.ts";
import {AnimatedNoInputEdgeAndNoCombinerCombinerNodeState} from "../animated-no-first-input-node-and-no-combiner/AnimatedNoFirstInputImageAndNoCombinerCombinerNodeState.ts";
export class InstantNoInputEdgeAndNoCombinerCombinerNodeState extends CombinerNodeState {
	public constructor() {
		super("unconfigured");
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
	public override makeInstant(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputEdgeAndNoCombinerCombinerNodeState {
		return new ManualNoInputEdgeAndNoCombinerCombinerNodeState(stepCount);
	}
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setCombiner(
		combiner: Combiner,
		outputEdges: readonly OutputEdge[],
	): InstantNoInputEdgeCombinerNodeState {
		return new InstantNoInputEdgeCombinerNodeState(combiner);
	}
	public override setInputEdgeWithImage(
		thisNode: CombinerNode,
		inputNode: Node,
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): InstantNoCombinerCombinerNodeState {
		return new InstantNoCombinerCombinerNodeState(inputNode, inputNodeImage);
	}
	public override setInputEdgeWithoutImage(
		thisNode: CombinerNode,
		inputNode: Node,
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageAndNoCombinerCombinerNodeState {
		return new InstantNoInputImageAndNoCombinerCombinerNodeState(inputNode);
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
