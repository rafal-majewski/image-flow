import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualMappingSucceededCombinerNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededCombinerNodeState.ts";
import {ManualNoInputImageCombinerNodeState} from "../manual-no-input-node-image/ManualNoInputImageCombinerNodeState.ts";
import {ManualNoInputEdgeCombinerNodeState} from "../manual-no-input-node/ManualNoInputEdgeCombinerNodeState.ts";
import {ManualNoCombinerCombinerNodeState} from "../manual-no-combiner/ManualNoCombinerCombinerNodeState.ts";
import {InstantMappingSucceededCombinerNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededCombinerNodeState.ts";
import {AnimatedMappingInProgressCombinerNodeState} from "../animated-mapping-in-progress/AnimatedMappingInProgressCombinerNodeState.ts";
export class ManualMappingInProgressCombinerNodeState extends CombinerNodeState {
	public constructor(
		generator: Generator<ImageData, ImageData, void>,
		inputNode: Node,
		inputNodeImage: ImageData,
		combiner: Combiner,
		outputImage: ImageData,
		stepCount: number,
	) {
		super("working");
		this.generator = generator;
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
	public override doManualSteps(
		outputEdges: readonly OutputEdge[],
	):
		| ManualMappingInProgressCombinerNodeState
		| ManualMappingSucceededCombinerNodeState {
		let currentOutputImage = this.outputImage;
		for (
			let stepCountLeft = this.stepCount;
			stepCountLeft > 0;
			stepCountLeft -= 1
		) {
			const generatorResult = this.generator.next();
			if (generatorResult.done) {
				return new ManualMappingSucceededCombinerNodeState(
					this.inputEdge,
					this.inputNodeImage,
					this.combiner,
					generatorResult.value,
					this.stepCount,
				);
			} else {
				currentOutputImage = generatorResult.value;
			}
		}
		return new ManualMappingInProgressCombinerNodeState(
			this.generator,
			this.inputEdge,
			this.inputNodeImage,
			this.combiner,
			currentOutputImage,
			this.stepCount,
		);
	}
	private readonly generator: Generator<ImageData, ImageData, void>;
	private readonly inputEdge: InputEdge;
	private readonly inputNodeImage: ImageData;
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedMappingInProgressCombinerNodeState {
		return new AnimatedMappingInProgressCombinerNodeState(
			this.generator,
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
		for (;;) {
			const generatorResult = this.generator.next();
			if (generatorResult.done) {
				return new InstantMappingSucceededCombinerNodeState(
					this.inputEdge,
					this.inputNodeImage,
					this.combiner,
					generatorResult.value,
				);
			}
		}
	}
	public override makeManual(
		newStepCount: number,
	): ManualMappingInProgressCombinerNodeState {
		return new ManualMappingInProgressCombinerNodeState(
			this.generator,
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
		const newGenerator = this.combiner.map(this.inputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new ManualMappingSucceededCombinerNodeState(
				this.inputEdge,
				this.inputNodeImage,
				this.combiner,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualMappingInProgressCombinerNodeState(
				newGenerator,
				this.inputEdge,
				this.inputNodeImage,
				this.combiner,
				newGeneratorResult.value,
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
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new ManualMappingSucceededCombinerNodeState(
				this.inputEdge,
				this.inputNodeImage,
				newCombiner,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
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
	): ManualNoInputImageCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
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
	): ManualMappingInProgressCombinerNodeState {
		return new ManualMappingInProgressCombinerNodeState(
			this.generator,
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
		return new ManualNoInputEdgeCombinerNodeState(
			this.combiner,
			this.stepCount,
		);
	}
	public override unsetInputImage(
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageCombinerNodeState {
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
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
