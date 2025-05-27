import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {AnimatedMappingInProgressMapperNodeState} from "../animated-mapping-in-progress/AnimatedMappingInProgressMapperNodeState.ts";
import {AnimatedMappingSucceededMapperNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededMapperNodeState.ts";
import {AnimatedNoInputEdgeAndNoMapperMapperNodeState} from "../animated-no-input-node-and-no-mapper/AnimatedNoInputEdgeAndNoMapperMapperNodeState.ts";
import {InstantNoMapperMapperNodeState} from "../instant-no-mapper/InstantNoMapperMapperNodeState.ts";
import {ManualNoMapperMapperNodeState} from "../manual-no-mapper/ManualNoMapperMapperNodeState.ts";
import {AnimatedNoInputImageAndNoMapperMapperNodeState} from "../animated-no-input-node-image-and-no-mapper/AnimatedNoInputImageAndNoMapperMapperNodeState.ts";
export class AnimatedNoMapperMapperNodeState extends MapperNodeState {
	public constructor(
		inputEdge: InputEdge,
		inputNodeImage: ImageData,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	) {
		super("unconfigured");
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
	}
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
	): AnimatedNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoMapperMapperNodeState(
			this.inputEdge,
			this.inputNodeImage,
			newIntervalId,
			newIntervalIntervalSeconds,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new InstantNoMapperMapperNodeState(
			this.inputEdge,
			this.inputNodeImage,
		);
	}
	public override makeManual(stepCount: number): ManualNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new ManualNoMapperMapperNodeState(
			this.inputEdge,
			this.inputNodeImage,
			stepCount,
		);
	}
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setInputEdgeWithImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoMapperMapperNodeState {
		return new AnimatedNoMapperMapperNodeState(
			newInputNode,
			newInputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageAndNoMapperMapperNodeState {
		return new AnimatedNoInputImageAndNoMapperMapperNodeState(
			newInputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setInputNodeImage(
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoMapperMapperNodeState {
		return new AnimatedNoMapperMapperNodeState(
			this.inputEdge,
			newInputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoMapperMapperNodeState(
			this.inputEdge,
			this.inputNodeImage,
			newIntervalId,
			newIntervalIntervalSeconds,
		);
	}
	public override setMapper(
		mapper: Mapper,
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingInProgressMapperNodeState
		| AnimatedMappingSucceededMapperNodeState {
		const generator = mapper.map(this.inputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				this.inputEdge,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				mapper,
				generatorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				generator,
				this.inputEdge,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				mapper,
				generatorResult.value,
			);
		}
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetInputEdge(
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputEdgeAndNoMapperMapperNodeState {
		return new AnimatedNoInputEdgeAndNoMapperMapperNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override unsetInputImage(
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageAndNoMapperMapperNodeState {
		return new AnimatedNoInputImageAndNoMapperMapperNodeState(
			this.inputEdge,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override unsetMapper(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: MapperNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
