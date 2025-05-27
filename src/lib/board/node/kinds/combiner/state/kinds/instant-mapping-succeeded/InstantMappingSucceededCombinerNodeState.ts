import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Combiner} from "../../../combiner/Combiner.ts";
import type {CombinerNode} from "../../../CombinerNode.svelte.ts";
import {CombinerNodeState} from "../../CombinerNodeState.ts";
import {AnimatedMappingSucceededCombinerNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededCombinerNodeState.ts";
import {InstantNoInputEdgeCombinerNodeState} from "../instant-no-input-node/InstantNoInputEdgeCombinerNodeState.ts";
import {InstantNoCombinerCombinerNodeState} from "../instant-no-combiner/InstantNoCombinerCombinerNodeState.ts";
import {ManualMappingSucceededCombinerNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededCombinerNodeState.ts";
import {InstantNoInputImageCombinerNodeState} from "../instant-no-input-node-image/InstantNoInputImageCombinerNodeState.ts";
export class InstantMappingSucceededCombinerNodeState extends CombinerNodeState {
	public constructor(
		inputEdge: InputEdge,
		inputNodeImage: ImageData,
		combiner: Combiner,
		outputImage: ImageData,
	) {
		super("done");
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
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
	public override makeInstant(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualMappingSucceededCombinerNodeState {
		return new ManualMappingSucceededCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
			this.combiner,
			this.outputImage,
			stepCount,
		);
	}
	public readonly outputImage: ImageData;
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setCombiner(
		newCombiner: Combiner,
		outputEdges: readonly OutputEdge[],
	): InstantMappingSucceededCombinerNodeState {
		const generator = newCombiner.map(this.inputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededCombinerNodeState(
					this.inputEdge,
					this.inputNodeImage,
					newCombiner,
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
		this.inputEdge.disconnectFromInputNode();
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new InstantNoInputImageCombinerNodeState(
			newInputNode,
			this.combiner,
		);
	}
	public override setInputNodeImage(
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): InstantMappingSucceededCombinerNodeState {
		const generator = this.combiner.map(newInputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededCombinerNodeState(
					this.inputEdge,
					newInputNodeImage,
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
	): InstantNoCombinerCombinerNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new InstantNoCombinerCombinerNodeState(
			this.inputEdge,
			this.inputNodeImage,
		);
	}
	public override unsetInputEdge(
		thisNode: CombinerNode,
		outputEdges: readonly OutputEdge[],
	): InstantNoInputEdgeCombinerNodeState {
		this.inputEdge.disconnectFromInputNode();
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new InstantNoInputEdgeCombinerNodeState(this.combiner);
	}
	public override unsetInputImage(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageCombinerNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new InstantNoInputImageCombinerNodeState(
			this.inputEdge,
			this.combiner,
		);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: CombinerNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputNodeToUpdate.setInputEdgeWithImage(thisNode, this.inputNodeImage);
	}
}
