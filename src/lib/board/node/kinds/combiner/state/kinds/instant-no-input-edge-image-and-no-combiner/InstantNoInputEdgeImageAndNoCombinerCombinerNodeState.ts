import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import {InstantNoCombinerCombinerNodeState} from "../instant-no-combiner/InstantNoCombinerCombinerNodeState.ts";
import {InstantNoInputImageCombinerNodeState} from "../instant-no-input-node-image/InstantNoInputImageCombinerNodeState.ts";
import {ManualNoInputImageAndNoCombinerCombinerNodeState} from "../manual-no-input-node-image-and-no-combiner/ManualNoInputImageAndNoCombinerCombinerNodeState.ts";
import {AnimatedNoInputImageAndNoCombinerCombinerNodeState} from "../animated-no-input-node-image-and-no-combiner/AnimatedNoInputImageAndNoCombinerCombinerNodeState.ts";
export class InstantNoInputImageAndNoCombinerCombinerNodeState extends CombinerNodeState {
	public constructor(inputEdge: InputEdge) {
		super("unconfigured");
		this.inputNode = inputNode;
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
	public override makeInstant(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputImageAndNoCombinerCombinerNodeState {
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
	): InstantNoInputImageCombinerNodeState {
		return new InstantNoInputImageCombinerNodeState(this.inputEdge, combiner);
	}
	public override setInputEdgeWithImage(
		thisNode: CombinerNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): InstantNoCombinerCombinerNodeState {
		return new InstantNoCombinerCombinerNodeState(
			newInputNode,
			newInputNodeImage,
		);
	}
	public override setInputEdgeWithoutImage(
		thisNode: CombinerNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageAndNoCombinerCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new InstantNoInputImageAndNoCombinerCombinerNodeState(newInputNode);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): InstantNoCombinerCombinerNodeState {
		return new InstantNoCombinerCombinerNodeState(
			this.inputEdge,
			inputNodeImage,
		);
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
	): InstantNoInputImageAndNoCombinerCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new InstantNoInputImageAndNoCombinerCombinerNodeState(
			this.inputEdge,
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
