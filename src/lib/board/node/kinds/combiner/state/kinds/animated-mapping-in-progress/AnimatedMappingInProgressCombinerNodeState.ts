import type {OutputNode} from "../../../../../OutputNode.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {InstantMappingSucceededCombinerNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededCombinerNodeState.ts";
import {ManualMappingInProgressCombinerNodeState} from "../manual-mapping-in-progress/ManualMappingInProgressCombinerNodeState.ts";
import {AnimatedMappingSucceededCombinerNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededCombinerNodeState.ts";
import {
	AnimatedNoFirstInputImageCombinerNodeState,
	AnimatedNoInputEdgeCombinerNodeState,
} from "../animated-no-first-input-node/AnimatedNoFirstInputImageCombinerNodeState.ts";
import {AnimatedNoCombinerCombinerNodeState} from "../animated-no-combiner/AnimatedNoCombinerCombinerNodeState.ts";
import {
	AnimatedNoFirstInputImageImageCombinerNodeState,
	AnimatedNoInputImageCombinerNodeState,
} from "../animated-no-first-input-node-image/AnimatedNoFirstInputImageImageCombinerNodeState.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
export class AnimatedMappingInProgressCombinerNodeState extends CombinerNodeState {
	public constructor(
		combiner: Combiner,
		firstInputEdge: Edge<CombinerNode>,
		firstInputEdgeInputNodeImage: ImageData,
		generator: Generator<ImageData, ImageData, void>,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		outputImage: ImageData,
		secondInputNode: Node,
		secondInputNodeImage: ImageData,
	) {
		super("working");
		this.combiner = combiner;
		this.firstInputNode = firstInputNode;
		this.firstInputNodeImage = firstInputNodeImage;
		this.generator = generator;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
		this.outputImage = outputImage;
		this.secondInputNode = secondInputNode;
		this.secondInputNodeImage = secondInputNodeImage;
	}
	public readonly combiner: Combiner;
	public override doAnimatedStep(
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingInProgressCombinerNodeState
		| AnimatedMappingSucceededCombinerNodeState {
		const generatorResult = this.generator.next();
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
			return new AnimatedMappingInProgressCombinerNodeState(
				this.generator,
				this.inputEdge,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.combiner,
				generatorResult.value,
			);
		}
	}
	public override doManualSteps(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	private readonly firstInputEdge: InputEdge;
	private readonly firstInputEdgeImage: ImageData;
	private readonly firstInputNode: Node;
	private readonly firstInputNodeImage: ImageData;
	private readonly generator: Generator<ImageData, ImageData, void>;
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override makeAnimated(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedMappingInProgressCombinerNodeState {
		clearInterval(this.intervalId);
		return new AnimatedMappingInProgressCombinerNodeState(
			this.generator,
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
		const newGenerator = this.combiner.map(this.inputNodeImage);
		for (;;) {
			const newGeneratorResult = newGenerator.next();
			if (newGeneratorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(newGeneratorResult.value);
				}
				return new InstantMappingSucceededCombinerNodeState(
					this.inputEdge,
					this.inputNodeImage,
					this.combiner,
					newGeneratorResult.value,
				);
			}
		}
	}
	public override makeManual(
		stepCount: number,
	): ManualMappingInProgressCombinerNodeState {
		clearInterval(this.intervalId);
		return new ManualMappingInProgressCombinerNodeState(
			this.generator,
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
		const newGenerator = this.combiner.combine(
			this.firstInputNodeImage,
			this.secondInputNodeImage,
		);
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
				this.combiner,
				newGeneratorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressCombinerNodeState(
				newGenerator,
				this.inputEdge,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.combiner,
				newGeneratorResult.value,
			);
		}
	}
	private readonly secondInputEdge: InputEdge;
	private readonly secondInputEdgeImage: ImageData;
	private readonly secondInputNode: Node;
	private readonly secondInputNodeImage: ImageData;
	public override setCombiner(
		newCombiner: Combiner,
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingInProgressCombinerNodeState
		| AnimatedMappingSucceededCombinerNodeState {
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
		| AnimatedMappingInProgressCombinerNodeState
		| AnimatedMappingSucceededCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		const newGenerator = this.combiner.map(newInputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new AnimatedMappingSucceededCombinerNodeState(
				newInputNode,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.combiner,
				newGeneratorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressCombinerNodeState(
				newGenerator,
				newInputNode,
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
		this.inputEdge.disconnectFromInputNode();
		return new AnimatedNoInputImageCombinerNodeState(
			newInputNode,
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
	): AnimatedMappingInProgressCombinerNodeState {
		clearInterval(this.intervalId);
		return new AnimatedMappingInProgressCombinerNodeState(
			this.combiner,
			this.firstInputNode,
			this.firstInputNodeImage,
			this.generator,
			newIntervalId,
			newIntervalIntervalSeconds,
			this.outputImage,
			this.secondInputNode,
			this.secondInputNodeImage,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetCombiner(
		outputEdges: readonly OutputEdge[],
	): AnimatedNoCombinerCombinerNodeState {
		return new AnimatedNoCombinerCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override unsetFirstInputEdge(
		thisNode: CombinerNode,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputEdgeCombinerNodeState {
		this.firstInputEdge.inputNode.deleteOutputEdge(thisNode);
		return new AnimatedNoFirstInputEdgeCombinerNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
			this.combiner,
		);
	}
	public override unsetFirstInputNodeImage(
		outputEdges: readonly OutputEdge[],
	): AnimatedNoFirstInputImageImageCombinerNodeState {
		return new AnimatedNoFirstInputImageImageCombinerNodeState(
			this.inputEdge,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.combiner,
		);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: CombinerNode,
		outputEdgeToUpdate: Edge<OutputNode>,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
