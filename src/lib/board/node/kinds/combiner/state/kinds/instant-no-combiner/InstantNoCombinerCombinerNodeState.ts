import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {InstantMappingSucceededCombinerNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededCombinerNodeState.ts";
import {InstantNoInputImageAndNoCombinerCombinerNodeState} from "../instant-no-input-node-image-and-no-combiner/InstantNoInputImageAndNoCombinerCombinerNodeState.ts";
import {InstantNoInputEdgeAndNoCombinerCombinerNodeState} from "../instant-no-input-node-and-no-combiner/InstantNoInputEdgeAndNoCombinerCombinerNodeState.ts";
import {ManualNoCombinerCombinerNodeState} from "../manual-no-combiner/ManualNoCombinerCombinerNodeState.ts";
import {AnimatedNoCombinerCombinerNodeState} from "../animated-no-combiner/AnimatedNoCombinerCombinerNodeState.ts";
export class InstantNoCombinerCombinerNodeState extends CombinerNodeState {
	public constructor(inputEdge: InputEdge, inputNodeImage: ImageData) {
		super("unconfigured");
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
	}
	public override doAnimatedStep(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override doManualSteps(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	private readonly inputEdge: InputEdge;
	private readonly inputNodeImage: ImageData;
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoCombinerCombinerNodeState {
		return new AnimatedNoCombinerCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public override makeInstant(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualNoCombinerCombinerNodeState {
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
	): InstantMappingSucceededCombinerNodeState {
		const generator = combiner.map(this.inputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededCombinerNodeState(
					this.inputEdge,
					this.inputNodeImage,
					combiner,
					generatorResult.value,
				);
			}
		}
	}
	public override setInputEdgeWithImage(
		thisNode: CombinerNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): InstantNoCombinerCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
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
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): InstantNoCombinerCombinerNodeState {
		return new InstantNoCombinerCombinerNodeState(
			this.inputEdge,
			newInputNodeImage,
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
	): InstantNoInputEdgeAndNoCombinerCombinerNodeState {
		return new InstantNoInputEdgeAndNoCombinerCombinerNodeState();
	}
	public override unsetInputImage(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageAndNoCombinerCombinerNodeState {
		return new InstantNoInputImageAndNoCombinerCombinerNodeState(
			this.inputEdge,
		);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: CombinerNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
