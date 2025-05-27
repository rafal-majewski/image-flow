import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualNoCombinerCombinerNodeState} from "../manual-no-combiner/ManualNoCombinerCombinerNodeState.ts";
import {ManualNoInputImageCombinerNodeState} from "../manual-no-input-node-image/ManualNoInputImageCombinerNodeState.ts";
import {ManualNoInputEdgeCombinerNodeState} from "../manual-no-input-node/ManualNoInputEdgeCombinerNodeState.ts";
import {ManualNoInputEdgeAndNoCombinerCombinerNodeState} from "../manual-no-input-node-and-no-combiner/ManualNoInputEdgeAndNoCombinerCombinerNodeState.ts";
import {InstantNoInputImageAndNoCombinerCombinerNodeState} from "../instant-no-input-node-image-and-no-combiner/InstantNoInputImageAndNoCombinerCombinerNodeState.ts";
import {AnimatedNoInputImageAndNoCombinerCombinerNodeState} from "../animated-no-input-node-image-and-no-combiner/AnimatedNoInputImageAndNoCombinerCombinerNodeState.ts";
export class ManualNoInputImageAndNoCombinerCombinerNodeState extends CombinerNodeState {
	public constructor(inputEdge: InputEdge, stepCount: number) {
		super("unconfigured");
		this.inputNode = inputNode;
		this.stepCount = stepCount;
	}
	public override doAnimatedStep(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override doManualSteps(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	private readonly inputEdge: InputEdge;
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoInputImageAndNoCombinerCombinerNodeState {
		return new AnimatedNoInputImageAndNoCombinerCombinerNodeState(
			this.inputEdge,
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageAndNoCombinerCombinerNodeState {
		return new InstantNoInputImageAndNoCombinerCombinerNodeState(
			this.inputEdge,
		);
	}
	public override makeManual(
		newStepCount: number,
	): ManualNoInputImageAndNoCombinerCombinerNodeState {
		return new ManualNoInputImageAndNoCombinerCombinerNodeState(
			this.inputEdge,
			newStepCount,
		);
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
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageAndNoCombinerCombinerNodeState {
		return new ManualNoInputImageAndNoCombinerCombinerNodeState(
			newInputNode,
			this.stepCount,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): ManualNoCombinerCombinerNodeState {
		return new ManualNoCombinerCombinerNodeState(
			this.inputEdge,
			inputNodeImage,
			this.stepCount,
		);
	}
	public override setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override setStepCount(
		newStepCount: number,
	): ManualNoInputImageAndNoCombinerCombinerNodeState {
		return new ManualNoInputImageAndNoCombinerCombinerNodeState(
			this.inputEdge,
			this.stepCount,
		);
	}
	public readonly stepCount: number;
	public override unsetCombiner(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override unsetInputEdge(
		thisNode: CombinerNode,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputEdgeAndNoCombinerCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new ManualNoInputEdgeAndNoCombinerCombinerNodeState(this.stepCount);
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
