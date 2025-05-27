import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {AnimatedMappingInProgressCombinerNodeState} from "../animated-mapping-in-progress/AnimatedMappingInProgressCombinerNodeState.ts";
import {AnimatedMappingSucceededCombinerNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededCombinerNodeState.ts";
import {AnimatedNoInputEdgeAndNoCombinerCombinerNodeState} from "../animated-no-first-input-node-and-no-combiner/AnimatedNoFirstInputImageAndNoCombinerCombinerNodeState.ts";
import {InstantNoCombinerCombinerNodeState} from "../instant-no-combiner/InstantNoCombinerCombinerNodeState.ts";
import {ManualNoCombinerCombinerNodeState} from "../manual-no-combiner/ManualNoCombinerCombinerNodeState.ts";
import {AnimatedNoInputImageAndNoCombinerCombinerNodeState} from "../animated-no-input-node-image-and-no-combiner/AnimatedNoInputImageAndNoCombinerCombinerNodeState.ts";
export class AnimatedNoCombinerCombinerNodeState extends CombinerNodeState {
	public constructor(
		inputEdge: InputEdge,
		inputNodeImage: ImageData,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	) {
		super("unconfigured");
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
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
	private readonly inputNodeImage: ImageData;
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override makeAnimated(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoCombinerCombinerNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoCombinerCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			newIntervalId,
			newIntervalIntervalSeconds,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoCombinerCombinerNodeState {
		clearInterval(this.intervalId);
		return new InstantNoCombinerCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
		);
	}
	public override makeManual(
		stepCount: number,
	): ManualNoCombinerCombinerNodeState {
		clearInterval(this.intervalId);
		return new ManualNoCombinerCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			stepCount,
		);
	}
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setCombiner(
		combiner: Combiner,
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingInProgressCombinerNodeState
		| AnimatedMappingSucceededCombinerNodeState {
		const generator = combiner.map(this.inputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new AnimatedMappingSucceededCombinerNodeState(
				this.inputEdge,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				combiner,
				generatorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressCombinerNodeState(
				generator,
				this.inputEdge,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				combiner,
				generatorResult.value,
			);
		}
	}
	public override setInputEdgeWithImage(
		thisNode: CombinerNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoCombinerCombinerNodeState {
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
		return new AnimatedNoInputImageAndNoCombinerCombinerNodeState(
			newInputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setInputNodeImage(
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoCombinerCombinerNodeState {
		return new AnimatedNoCombinerCombinerNodeState(
			this.inputEdge,
			newInputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoCombinerCombinerNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoCombinerCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
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
	): AnimatedNoInputEdgeAndNoCombinerCombinerNodeState {
		return new AnimatedNoInputEdgeAndNoCombinerCombinerNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override unsetInputImage(
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageAndNoCombinerCombinerNodeState {
		return new AnimatedNoInputImageAndNoCombinerCombinerNodeState(
			this.inputEdge,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: CombinerNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
