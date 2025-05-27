import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualMappingInProgressCombinerNodeState} from "../manual-mapping-in-progress/ManualMappingInProgressCombinerNodeState.ts";
import {ManualMappingSucceededCombinerNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededCombinerNodeState.ts";
import {ManualNoInputImageCombinerNodeState} from "../manual-no-input-node-image/ManualNoInputImageCombinerNodeState.ts";
import {ManualNoInputEdgeAndNoCombinerCombinerNodeState} from "../manual-no-input-node-and-no-combiner/ManualNoInputEdgeAndNoCombinerCombinerNodeState.ts";
import {InstantNoInputEdgeCombinerNodeState} from "../instant-no-input-node/InstantNoInputEdgeCombinerNodeState.ts";
import {AnimatedNoInputEdgeCombinerNodeState} from "../animated-no-first-input-node/AnimatedNoFirstInputImageCombinerNodeState.ts";
export class ManualNoInputEdgeCombinerNodeState extends CombinerNodeState {
	public constructor(combiner: Combiner, stepCount: number) {
		super("unconfigured");
		this.combiner = combiner;
		this.stepCount = stepCount;
	}
	public readonly combiner: Combiner;
	public override doAnimatedStep(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override doManualSteps(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoInputEdgeCombinerNodeState {
		return new AnimatedNoInputEdgeCombinerNodeState(
			intervalId,
			intervalIntervalSeconds,
			this.combiner,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputEdgeCombinerNodeState {
		return new InstantNoInputEdgeCombinerNodeState(this.combiner);
	}
	public override makeManual(
		newStepCount: number,
	): ManualNoInputEdgeCombinerNodeState {
		return new ManualNoInputEdgeCombinerNodeState(this.combiner, newStepCount);
	}
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setCombiner(
		newCombiner: Combiner,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputEdgeCombinerNodeState {
		return new ManualNoInputEdgeCombinerNodeState(newCombiner, this.stepCount);
	}
	public override setInputEdgeWithImage(
		thisNode: CombinerNode,
		inputNode: Node,
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	):
		| ManualMappingInProgressCombinerNodeState
		| ManualMappingSucceededCombinerNodeState {
		const newGenerator = this.combiner.map(inputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new ManualMappingSucceededCombinerNodeState(
				inputNode,
				inputNodeImage,
				this.combiner,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualMappingInProgressCombinerNodeState(
				newGenerator,
				inputNode,
				inputNodeImage,
				this.combiner,
				newGeneratorResult.value,
				this.stepCount,
			);
		}
	}
	public override setInputEdgeWithoutImage(
		thisNode: CombinerNode,
		inputNode: Node,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageCombinerNodeState {
		return new ManualNoInputImageCombinerNodeState(
			inputNode,
			this.combiner,
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
	): ManualNoInputEdgeCombinerNodeState {
		return new ManualNoInputEdgeCombinerNodeState(this.combiner, newStepCount);
	}
	public readonly stepCount: number;
	public override unsetCombiner(
		outputEdges: readonly OutputEdge[],
	): ManualNoInputEdgeAndNoCombinerCombinerNodeState {
		return new ManualNoInputEdgeAndNoCombinerCombinerNodeState(this.stepCount);
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
