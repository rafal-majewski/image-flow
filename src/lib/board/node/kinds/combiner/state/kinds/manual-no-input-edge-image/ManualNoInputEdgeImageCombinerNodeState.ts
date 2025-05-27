import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualMappingSucceededCombinerNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededCombinerNodeState.ts";
import {ManualMappingInProgressCombinerNodeState} from "../manual-mapping-in-progress/ManualMappingInProgressCombinerNodeState.ts";
import {ManualNoInputEdgeCombinerNodeState} from "../manual-no-input-node/ManualNoInputEdgeCombinerNodeState.ts";
import {ManualNoInputImageAndNoCombinerCombinerNodeState} from "../manual-no-input-node-image-and-no-combiner/ManualNoInputImageAndNoCombinerCombinerNodeState.ts";
import {InstantNoInputImageCombinerNodeState} from "../instant-no-input-node-image/InstantNoInputImageCombinerNodeState.ts";
import {AnimatedNoInputImageCombinerNodeState} from "../animated-no-first-input-node-image/AnimatedNoFirstInputImageImageCombinerNodeState.ts";
export class ManualNoInputImageCombinerNodeState extends CombinerNodeState {
	public constructor(
		inputEdge: InputEdge,
		combiner: Combiner,
		stepCount: number,
	) {
		super("idling");
		this.inputNode = inputNode;
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
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageCombinerNodeState {
		return new InstantNoInputImageCombinerNodeState(
			this.inputEdge,
			this.combiner,
		);
	}
	public override makeManual(
		newStepCount: number,
	): ManualNoInputImageCombinerNodeState {
		return new ManualNoInputImageCombinerNodeState(
			this.inputEdge,
			this.combiner,
			newStepCount,
		);
	}
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setCombiner(
		newCombiner: Combiner,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageCombinerNodeState {
		return new ManualNoInputImageCombinerNodeState(
			this.inputEdge,
			newCombiner,
			this.stepCount,
		);
	}
	public override setInputEdgeWithImage(
		thisNode: CombinerNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	):
		| ManualMappingInProgressCombinerNodeState
		| ManualMappingSucceededCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		const generator = this.combiner.map(newInputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new ManualMappingSucceededCombinerNodeState(
				newInputNode,
				newInputNodeImage,
				this.combiner,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualMappingInProgressCombinerNodeState(
				generator,
				newInputNode,
				newInputNodeImage,
				this.combiner,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	public override setInputEdgeWithoutImage(
		thisNode: CombinerNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new ManualNoInputImageCombinerNodeState(
			newInputNode,
			this.combiner,
			this.stepCount,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	):
		| ManualMappingInProgressCombinerNodeState
		| ManualMappingSucceededCombinerNodeState {
		const generator = this.combiner.map(inputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new ManualMappingSucceededCombinerNodeState(
				this.inputEdge,
				inputNodeImage,
				this.combiner,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualMappingInProgressCombinerNodeState(
				generator,
				this.inputEdge,
				inputNodeImage,
				this.combiner,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	public override setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override setStepCount(
		newStepCount: number,
	): ManualNoInputImageCombinerNodeState {
		return new ManualNoInputImageCombinerNodeState(
			this.inputEdge,
			this.combiner,
			newStepCount,
		);
	}
	public readonly stepCount: number;
	public override unsetCombiner(
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageAndNoCombinerCombinerNodeState {
		return new ManualNoInputImageAndNoCombinerCombinerNodeState(
			this.inputEdge,
			this.stepCount,
		);
	}
	public override unsetInputEdge(
		thisNode: CombinerNode,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputEdgeCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new ManualNoInputEdgeCombinerNodeState(
			this.combiner,
			this.stepCount,
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
