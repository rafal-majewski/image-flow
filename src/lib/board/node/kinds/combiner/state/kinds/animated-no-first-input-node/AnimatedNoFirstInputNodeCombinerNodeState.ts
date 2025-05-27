import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import {AnimatedMappingInProgressCombinerNodeState} from "../animated-mapping-in-progress/AnimatedMappingInProgressCombinerNodeState.ts";
import {AnimatedMappingSucceededCombinerNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededCombinerNodeState.ts";
import {AnimatedNoInputEdgeAndNoCombinerCombinerNodeState} from "../animated-no-first-input-node-and-no-combiner/AnimatedNoFirstInputImageAndNoCombinerCombinerNodeState.ts";
import {InstantNoInputEdgeCombinerNodeState} from "../instant-no-input-node/InstantNoInputEdgeCombinerNodeState.ts";
import {ManualNoInputEdgeCombinerNodeState} from "../manual-no-input-node/ManualNoInputEdgeCombinerNodeState.ts";
import {AnimatedNoInputImageCombinerNodeState} from "../animated-no-first-input-node-image/AnimatedNoFirstInputImageImageCombinerNodeState.ts";
export class AnimatedNoFirstInputImageCombinerNodeState extends CombinerNodeState {
	public constructor(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		combiner: Combiner,
	) {
		super("unconfigured");
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
		this.combiner = combiner;
	}
	public readonly combiner: Combiner;
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
	): AnimatedNoInputEdgeCombinerNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputEdgeCombinerNodeState(
			newIntervalId,
			newIntervalIntervalSeconds,
			this.combiner,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputEdgeCombinerNodeState {
		clearInterval(this.intervalId);
		return new InstantNoInputEdgeCombinerNodeState(this.combiner);
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputEdgeCombinerNodeState {
		clearInterval(this.intervalId);
		return new ManualNoInputEdgeCombinerNodeState(this.combiner, stepCount);
	}
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setCombiner(
		newCombiner: Combiner,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputEdgeCombinerNodeState {
		return new AnimatedNoInputEdgeCombinerNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
			newCombiner,
		);
	}
	public override setInputEdgeWithImage(
		thisNode: CombinerNode,
		inputNode: Node,
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingInProgressCombinerNodeState
		| AnimatedMappingSucceededCombinerNodeState {
		const generator = this.combiner.map(inputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new AnimatedMappingSucceededCombinerNodeState(
				inputNode,
				inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.combiner,
				generatorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressCombinerNodeState(
				generator,
				inputNode,
				inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.combiner,
				generatorResult.value,
			);
		}
	}
	public override setInputEdgeWithoutImage(
		thisNode: CombinerNode,
		inputNode: Node,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageCombinerNodeState {
		return new AnimatedNoInputImageCombinerNodeState(
			inputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.combiner,
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
	): AnimatedNoInputEdgeCombinerNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputEdgeCombinerNodeState(
			newIntervalId,
			newIntervalIntervalSeconds,
			this.combiner,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetCombiner(
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputEdgeAndNoCombinerCombinerNodeState {
		return new AnimatedNoInputEdgeAndNoCombinerCombinerNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
		);
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
