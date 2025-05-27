import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {AnimatedMappingInProgressCombinerNodeState} from "../animated-mapping-in-progress/AnimatedMappingInProgressCombinerNodeState.ts";
import {AnimatedMappingSucceededCombinerNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededCombinerNodeState.ts";
import {AnimatedNoInputImageAndNoCombinerCombinerNodeState} from "../animated-no-input-node-image-and-no-combiner/AnimatedNoInputImageAndNoCombinerCombinerNodeState.ts";
import {AnimatedNoInputEdgeCombinerNodeState} from "../animated-no-first-input-node/AnimatedNoFirstInputImageCombinerNodeState.ts";
import {InstantNoInputImageCombinerNodeState} from "../instant-no-input-node-image/InstantNoInputImageCombinerNodeState.ts";
import {ManualNoInputImageCombinerNodeState} from "../manual-no-input-node-image/ManualNoInputImageCombinerNodeState.ts";
export class AnimatedNoFirstInputImageImageCombinerNodeState extends CombinerNodeState {
	public constructor(
		inputEdge: InputEdge,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		combiner: Combiner,
	) {
		super("idling");
		this.inputNode = inputNode;
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
	private readonly inputEdge: InputEdge;
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override makeAnimated(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoInputImageCombinerNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputImageCombinerNodeState(
			this.inputEdge,
			newIntervalId,
			newIntervalIntervalSeconds,
			this.combiner,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageCombinerNodeState {
		clearInterval(this.intervalId);
		return new InstantNoInputImageCombinerNodeState(
			this.inputEdge,
			this.combiner,
		);
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputImageCombinerNodeState {
		clearInterval(this.intervalId);
		return new ManualNoInputImageCombinerNodeState(
			this.inputEdge,
			this.combiner,
			stepCount,
		);
	}
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setCombiner(
		newCombiner: Combiner,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageCombinerNodeState {
		return new AnimatedNoInputImageCombinerNodeState(
			this.inputEdge,
			this.intervalId,
			this.intervalIntervalSeconds,
			newCombiner,
		);
	}
	public override setInputEdgeWithImage(
		thisNode: CombinerNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingSucceededCombinerNodeState
		| AnimatedMappingInProgressCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		const generator = this.combiner.map(newInputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new AnimatedMappingSucceededCombinerNodeState(
				newInputNode,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.combiner,
				generatorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressCombinerNodeState(
				generator,
				newInputNode,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.combiner,
				generatorResult.value,
			);
		}
	}
	public override setInputEdgeWithoutImage(
		thisNode: CombinerNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new AnimatedNoInputImageCombinerNodeState(
			newInputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.combiner,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingSucceededCombinerNodeState
		| AnimatedMappingInProgressCombinerNodeState {
		const generator = this.combiner.map(inputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new AnimatedMappingSucceededCombinerNodeState(
				this.inputEdge,
				inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.combiner,
				generatorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressCombinerNodeState(
				generator,
				this.inputEdge,
				inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.combiner,
				generatorResult.value,
			);
		}
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoInputImageCombinerNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputImageCombinerNodeState(
			this.inputEdge,
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
	): AnimatedNoInputImageAndNoCombinerCombinerNodeState {
		return new AnimatedNoInputImageAndNoCombinerCombinerNodeState(
			this.inputEdge,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override unsetInputEdge(
		thisNode: CombinerNode,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputEdgeCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new AnimatedNoInputEdgeCombinerNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
			this.combiner,
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
