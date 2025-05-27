import type {Node} from "../../../../../Node.svelte.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import type {OutputNode} from "../../../../../OutputNode.ts";
import {InstantMappingSucceededCombinerNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededCombinerNodeState.ts";
import {InstantNoInputImageCombinerNodeState} from "../instant-no-input-node-image/InstantNoInputImageCombinerNodeState.ts";
import {InstantNoInputEdgeAndNoCombinerCombinerNodeState} from "../instant-no-input-node-and-no-combiner/InstantNoInputEdgeAndNoCombinerCombinerNodeState.ts";
import {ManualNoInputEdgeCombinerNodeState} from "../manual-no-input-node/ManualNoInputEdgeCombinerNodeState.ts";
import {AnimatedNoInputEdgeCombinerNodeState} from "../animated-no-first-input-node/AnimatedNoFirstInputImageCombinerNodeState.ts";
export class InstantNoInputEdgeCombinerNodeState extends CombinerNodeState {
	public constructor(combiner: Combiner) {
		super("unconfigured");
		this.combiner = combiner;
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
	public override makeInstant(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputEdgeCombinerNodeState {
		return new ManualNoInputEdgeCombinerNodeState(this.combiner, stepCount);
	}
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setCombiner(
		newCombiner: Combiner,
		outputEdges: readonly OutputEdge[],
	): InstantNoInputEdgeCombinerNodeState {
		return new InstantNoInputEdgeCombinerNodeState(newCombiner);
	}
	public override setInputEdgeWithImage(
		thisNode: CombinerNode,
		inputNode: Node,
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): InstantMappingSucceededCombinerNodeState {
		const generator = this.combiner.map(inputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededCombinerNodeState(
					inputNode,
					inputNodeImage,
					this.combiner,
					generatorResult.value,
				);
			}
		}
	}
	public override setInputEdgeWithoutImage(
		thisNode: CombinerNode,
		inputNode: Node,
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageCombinerNodeState {
		return new InstantNoInputImageCombinerNodeState(inputNode, this.combiner);
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
	public override unsetCombiner(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputEdgeAndNoCombinerCombinerNodeState {
		return new InstantNoInputEdgeAndNoCombinerCombinerNodeState();
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
