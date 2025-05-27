import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualMappingInProgressCombinerNodeState} from "../manual-mapping-in-progress/ManualMappingInProgressCombinerNodeState.ts";
import {ManualNoInputImageCombinerNodeState} from "../manual-no-input-node-image/ManualNoInputImageCombinerNodeState.ts";
import {ManualNoInputEdgeCombinerNodeState} from "../manual-no-input-node/ManualNoInputEdgeCombinerNodeState.ts";
import {ManualNoCombinerCombinerNodeState} from "../manual-no-combiner/ManualNoCombinerCombinerNodeState.ts";
import {InstantMappingSucceededCombinerNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededCombinerNodeState.ts";
import {AnimatedMappingSucceededCombinerNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededCombinerNodeState.ts";
export class ManualMappingSucceededCombinerNodeState extends CombinerNodeState {
	public constructor(
		inputEdge: InputEdge,
		inputNodeImage: ImageData,
		combiner: Combiner,
		outputImage: ImageData,
		stepCount: number,
	) {
		super("done");
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
		this.combiner = combiner;
		this.outputImage = outputImage;
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
	private readonly inputNodeImage: ImageData;
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedMappingSucceededCombinerNodeState {
		return new AnimatedMappingSucceededCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			intervalId,
			intervalIntervalSeconds,
			this.combiner,
			this.outputImage,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantMappingSucceededCombinerNodeState {
		return new InstantMappingSucceededCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			this.combiner,
			this.outputImage,
		);
	}
	public override makeManual(
		newStepCount: number,
	): ManualMappingSucceededCombinerNodeState {
		return new ManualMappingSucceededCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			this.combiner,
			this.outputImage,
			newStepCount,
		);
	}
	public readonly outputImage: ImageData;
	public override resetOutputImage(
		outputEdges: readonly OutputEdge[],
	):
		| ManualMappingSucceededCombinerNodeState
		| ManualMappingInProgressCombinerNodeState {
		const generator = this.combiner.map(this.inputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new ManualMappingSucceededCombinerNodeState(
				this.inputEdge,
				this.inputNodeImage,
				this.combiner,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
			return new ManualMappingInProgressCombinerNodeState(
				generator,
				this.inputEdge,
				this.inputNodeImage,
				this.combiner,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	public override setCombiner(
		newCombiner: Combiner,
		outputEdges: readonly OutputEdge[],
	):
		| ManualMappingInProgressCombinerNodeState
		| ManualMappingSucceededCombinerNodeState {
		const newGenerator = newCombiner.map(this.inputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			return new ManualMappingSucceededCombinerNodeState(
				this.inputEdge,
				this.inputNodeImage,
				newCombiner,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
			return new ManualMappingInProgressCombinerNodeState(
				newGenerator,
				this.inputEdge,
				this.inputNodeImage,
				newCombiner,
				newGeneratorResult.value,
				this.stepCount,
			);
		}
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
		const newGenerator = this.combiner.map(newInputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new ManualMappingSucceededCombinerNodeState(
				newInputNode,
				newInputNodeImage,
				this.combiner,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
			return new ManualMappingInProgressCombinerNodeState(
				newGenerator,
				newInputNode,
				newInputNodeImage,
				this.combiner,
				newGeneratorResult.value,
				this.stepCount,
			);
		}
	}
	public override setInputEdgeWithoutImage(
		thisNode: CombinerNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): CombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new ManualNoInputImageCombinerNodeState(
			newInputNode,
			this.combiner,
			this.stepCount,
		);
	}
	public override setInputNodeImage(
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	):
		| ManualMappingInProgressCombinerNodeState
		| ManualMappingSucceededCombinerNodeState {
		const newGenerator = this.combiner.map(newInputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new ManualMappingSucceededCombinerNodeState(
				this.inputEdge,
				newInputNodeImage,
				this.combiner,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
			return new ManualMappingInProgressCombinerNodeState(
				newGenerator,
				this.inputEdge,
				newInputNodeImage,
				this.combiner,
				newGeneratorResult.value,
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
	): ManualMappingSucceededCombinerNodeState {
		return new ManualMappingSucceededCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			this.combiner,
			this.outputImage,
			newStepCount,
		);
	}
	public readonly stepCount: number;
	public override unsetCombiner(
		outputEdges: readonly OutputEdge[],
	): ManualNoCombinerCombinerNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new ManualNoCombinerCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			this.stepCount,
		);
	}
	public override unsetInputEdge(
		thisNode: CombinerNode,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputEdgeCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new ManualNoInputEdgeCombinerNodeState(
			this.combiner,
			this.stepCount,
		);
	}
	public override unsetInputImage(
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageCombinerNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new ManualNoInputImageCombinerNodeState(
			this.inputEdge,
			this.combiner,
			this.stepCount,
		);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: CombinerNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputNodeToUpdate.setInputEdgeWithImage(
			this.inputEdge,
			this.inputNodeImage,
		);
	}
}
