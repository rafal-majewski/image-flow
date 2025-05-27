import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import {InstantMappingSucceededCombinerNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededCombinerNodeState.ts";
import {InstantNoInputImageAndNoCombinerCombinerNodeState} from "../instant-no-input-node-image-and-no-combiner/InstantNoInputImageAndNoCombinerCombinerNodeState.ts";
import {ManualNoInputImageCombinerNodeState} from "../manual-no-input-node-image/ManualNoInputImageCombinerNodeState.ts";
import {AnimatedNoInputImageCombinerNodeState} from "../animated-no-first-input-node-image/AnimatedNoFirstInputImageImageCombinerNodeState.ts";
export class InstantNoInputImageCombinerNodeState extends CombinerNodeState {
	public constructor(inputEdge: InputEdge, combiner: Combiner) {
		super("idling");
		this.inputNode = inputNode;
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
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoInputImageCombinerNodeState {
		return new AnimatedNoInputImageCombinerNodeState(
			this.inputEdge,
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
	): ManualNoInputImageCombinerNodeState {
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
	): InstantNoInputImageCombinerNodeState {
		return new InstantNoInputImageCombinerNodeState(
			this.inputEdge,
			newCombiner,
		);
	}
	public override setInputEdgeWithImage(
		thisNode: CombinerNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): InstantMappingSucceededCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		const generator = this.combiner.map(newInputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededCombinerNodeState(
					newInputNode,
					newInputNodeImage,
					this.combiner,
					generatorResult.value,
				);
			}
		}
	}
	public override setInputEdgeWithoutImage(
		thisNode: CombinerNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageCombinerNodeState {
		return new InstantNoInputImageCombinerNodeState(
			newInputNode,
			this.combiner,
		);
	}
	public override setInputNodeImage(
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
					this.inputEdge,
					inputNodeImage,
					this.combiner,
					generatorResult.value,
				);
			}
		}
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
	): InstantNoInputImageAndNoCombinerCombinerNodeState {
		return new InstantNoInputImageAndNoCombinerCombinerNodeState(
			this.inputEdge,
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
