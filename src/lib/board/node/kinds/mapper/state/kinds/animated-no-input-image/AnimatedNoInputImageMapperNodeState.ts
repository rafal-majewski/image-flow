import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {AnimatedMappingInProgressMapperNodeState} from "../animated-mapping-in-progress/AnimatedMappingInProgressMapperNodeState.ts";
import {AnimatedMappingSucceededMapperNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededMapperNodeState.ts";
import {AnimatedNoInputImageAndNoMapperMapperNodeState} from "../animated-no-input-node-image-and-no-mapper/AnimatedNoInputImageAndNoMapperMapperNodeState.ts";
import {AnimatedNoInputEdgeMapperNodeState} from "../animated-no-input-node/AnimatedNoInputEdgeMapperNodeState.ts";
import {InstantNoInputImageMapperNodeState} from "../instant-no-input-node-image/InstantNoInputImageMapperNodeState.ts";
import {ManualNoInputImageMapperNodeState} from "../manual-no-input-node-image/ManualNoInputImageMapperNodeState.ts";
export class AnimatedNoInputImageMapperNodeState extends MapperNodeState {
	public constructor(
		inputEdge: InputEdge,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		mapper: Mapper,
	) {
		super("idling");
		this.inputNode = inputNode;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
		this.mapper = mapper;
	}
	public override doAnimatedStep(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override doManualSteps(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	private readonly inputEdge: InputEdge;
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override makeAnimated(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoInputImageMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputImageMapperNodeState(
			this.inputEdge,
			newIntervalId,
			newIntervalIntervalSeconds,
			this.mapper,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageMapperNodeState {
		clearInterval(this.intervalId);
		return new InstantNoInputImageMapperNodeState(this.inputEdge, this.mapper);
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputImageMapperNodeState {
		clearInterval(this.intervalId);
		return new ManualNoInputImageMapperNodeState(
			this.inputEdge,
			this.mapper,
			stepCount,
		);
	}
	public readonly mapper: Mapper;
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setInputEdgeWithImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingSucceededMapperNodeState
		| AnimatedMappingInProgressMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		const generator = this.mapper.map(newInputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				newInputNode,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				generator,
				newInputNode,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		}
	}
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new AnimatedNoInputImageMapperNodeState(
			newInputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.mapper,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingSucceededMapperNodeState
		| AnimatedMappingInProgressMapperNodeState {
		const generator = this.mapper.map(inputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				this.inputEdge,
				inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				generator,
				this.inputEdge,
				inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		}
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoInputImageMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputImageMapperNodeState(
			this.inputEdge,
			newIntervalId,
			newIntervalIntervalSeconds,
			this.mapper,
		);
	}
	public override setMapper(
		newMapper: Mapper,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageMapperNodeState {
		return new AnimatedNoInputImageMapperNodeState(
			this.inputEdge,
			this.intervalId,
			this.intervalIntervalSeconds,
			newMapper,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetInputEdge(
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputEdgeMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new AnimatedNoInputEdgeMapperNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
			this.mapper,
		);
	}
	public override unsetInputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override unsetMapper(
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageAndNoMapperMapperNodeState {
		return new AnimatedNoInputImageAndNoMapperMapperNodeState(
			this.inputEdge,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: MapperNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
