import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {AnimatedMappingInProgressCombinerNodeState} from "../animated-mapping-in-progress/AnimatedMappingInProgressCombinerNodeState.ts";
import {AnimatedNoInputEdgeCombinerNodeState} from "../animated-no-first-input-node/AnimatedNoFirstInputImageCombinerNodeState.ts";
import {AnimatedNoCombinerCombinerNodeState} from "../animated-no-combiner/AnimatedNoCombinerCombinerNodeState.ts";
import {InstantMappingSucceededCombinerNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededCombinerNodeState.ts";
import {ManualMappingSucceededCombinerNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededCombinerNodeState.ts";
import {AnimatedNoInputImageCombinerNodeState} from "../animated-no-first-input-node-image/AnimatedNoFirstInputImageImageCombinerNodeState.ts";
export class AnimatedMappingSucceededCombinerNodeState extends CombinerNodeState {
	public constructor(
		inputEdge: InputEdge,
		inputNodeImage: ImageData,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		combiner: Combiner,
		outputImage: ImageData,
	) {
		super("done");
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
		this.combiner = combiner;
		this.outputImage = outputImage;
	}
	public readonly combiner: Combiner;
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
	): AnimatedMappingSucceededCombinerNodeState {
		clearInterval(this.intervalId);
		return new AnimatedMappingSucceededCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			newIntervalId,
			newIntervalIntervalSeconds,
			this.combiner,
			this.outputImage,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantMappingSucceededCombinerNodeState {
		clearInterval(this.intervalId);
		return new InstantMappingSucceededCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			this.combiner,
			this.outputImage,
		);
	}
	public override makeManual(
		stepCount: number,
	): ManualMappingSucceededCombinerNodeState {
		clearInterval(this.intervalId);
		return new ManualMappingSucceededCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			this.combiner,
			this.outputImage,
			stepCount,
		);
	}
	public readonly outputImage: ImageData;
	public override resetOutputImage(
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingSucceededCombinerNodeState
		| AnimatedMappingInProgressCombinerNodeState {
		const generator = this.combiner.map(this.inputNodeImage);
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
				this.combiner,
				generatorResult.value,
			);
		} else {
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
			return new AnimatedMappingInProgressCombinerNodeState(
				generator,
				this.inputEdge,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.combiner,
				generatorResult.value,
			);
		}
	}
	public override setCombiner(
		newCombiner: Combiner,
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingSucceededCombinerNodeState
		| AnimatedMappingInProgressCombinerNodeState {
		const newGenerator = newCombiner.map(this.inputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new AnimatedMappingSucceededCombinerNodeState(
				this.inputEdge,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				newCombiner,
				newGeneratorResult.value,
			);
		} else {
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
			return new AnimatedMappingInProgressCombinerNodeState(
				newGenerator,
				this.inputEdge,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				newCombiner,
				newGeneratorResult.value,
			);
		}
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
		const newGenerator = this.combiner.map(newInputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new AnimatedMappingSucceededCombinerNodeState(
				this.inputEdge,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.combiner,
				newGeneratorResult.value,
			);
		} else {
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
			return new AnimatedMappingInProgressCombinerNodeState(
				newGenerator,
				this.inputEdge,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.combiner,
				newGeneratorResult.value,
			);
		}
	}
	public override setInputEdgeWithoutImage(
		thisNode: CombinerNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageCombinerNodeState {
		return new AnimatedNoInputImageCombinerNodeState(
			this.inputEdge,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.combiner,
		);
	}
	public override setInputNodeImage(
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingSucceededCombinerNodeState
		| AnimatedMappingInProgressCombinerNodeState {
		const newGenerator = this.combiner.map(newInputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new AnimatedMappingSucceededCombinerNodeState(
				this.inputEdge,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.combiner,
				newGeneratorResult.value,
			);
		} else {
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
			return new AnimatedMappingInProgressCombinerNodeState(
				newGenerator,
				this.inputEdge,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.combiner,
				newGeneratorResult.value,
			);
		}
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedMappingSucceededCombinerNodeState {
		clearInterval(this.intervalId);
		return new AnimatedMappingSucceededCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			newIntervalId,
			newIntervalIntervalSeconds,
			this.combiner,
			this.outputImage,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetCombiner(
		outputEdges: readonly OutputEdge[],
	): AnimatedNoCombinerCombinerNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new AnimatedNoCombinerCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override unsetInputEdge(
		thisNode: CombinerNode,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputEdgeCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new AnimatedNoInputEdgeCombinerNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
			this.combiner,
		);
	}
	public override unsetInputImage(
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageCombinerNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new AnimatedNoInputImageCombinerNodeState(
			this.inputEdge,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.combiner,
		);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: CombinerNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputNodeToUpdate.setInputEdgeWithImage(thisNode, this.outputImage);
	}
}
