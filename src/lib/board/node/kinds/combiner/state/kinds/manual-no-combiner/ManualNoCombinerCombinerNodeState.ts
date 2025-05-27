import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualMappingSucceededCombinerNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededCombinerNodeState.ts";
import {ManualMappingInProgressCombinerNodeState} from "../manual-mapping-in-progress/ManualMappingInProgressCombinerNodeState.ts";
import {ManualNoInputImageAndNoCombinerCombinerNodeState} from "../manual-no-input-node-image-and-no-combiner/ManualNoInputImageAndNoCombinerCombinerNodeState.ts";
import {ManualNoInputEdgeAndNoCombinerCombinerNodeState} from "../manual-no-input-node-and-no-combiner/ManualNoInputEdgeAndNoCombinerCombinerNodeState.ts";
import {InstantNoCombinerCombinerNodeState} from "../instant-no-combiner/InstantNoCombinerCombinerNodeState.ts";
import {AnimatedNoCombinerCombinerNodeState} from "../animated-no-combiner/AnimatedNoCombinerCombinerNodeState.ts";
export class ManualNoCombinerCombinerNodeState extends CombinerNodeState {
	public constructor(
		inputEdge: InputEdge,
		inputNodeImage: ImageData,
		stepCount: number,
	) {
		super("unconfigured");
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
		this.stepCount = stepCount;
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
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoCombinerCombinerNodeState {
		return new InstantNoCombinerCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
		);
	}
	public override makeManual(
		newStepCount: number,
	): ManualNoCombinerCombinerNodeState {
		return new ManualNoCombinerCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			newStepCount,
		);
	}
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setCombiner(
		combiner: Combiner,
		outputEdges: readonly OutputEdge[],
	):
		| ManualMappingInProgressCombinerNodeState
		| ManualMappingSucceededCombinerNodeState {
		const generator = combiner.map(this.inputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new ManualMappingSucceededCombinerNodeState(
				this.inputEdge,
				this.inputNodeImage,
				combiner,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualMappingInProgressCombinerNodeState(
				generator,
				this.inputEdge,
				this.inputNodeImage,
				combiner,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	public override setInputEdgeWithImage(
		thisNode: CombinerNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): ManualNoCombinerCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new ManualNoCombinerCombinerNodeState(
			newInputNode,
			newInputNodeImage,
			this.stepCount,
		);
	}
	public override setInputEdgeWithoutImage(
		thisNode: CombinerNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageAndNoCombinerCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new ManualNoInputImageAndNoCombinerCombinerNodeState(
			newInputNode,
			this.stepCount,
		);
	}
	public override setInputNodeImage(
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): ManualNoCombinerCombinerNodeState {
		return new ManualNoCombinerCombinerNodeState(
			this.inputEdge,
			newInputNodeImage,
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
	): ManualNoCombinerCombinerNodeState {
		return new ManualNoCombinerCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			newStepCount,
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
	public override unsetInputImage(
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageAndNoCombinerCombinerNodeState {
		return new ManualNoInputImageAndNoCombinerCombinerNodeState(
			this.inputEdge,
			this.stepCount,
		);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: CombinerNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
