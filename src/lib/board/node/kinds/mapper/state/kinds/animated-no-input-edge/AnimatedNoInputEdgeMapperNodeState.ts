import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {AnimatedMappingInProgressMapperNodeState} from "../animated-mapping-in-progress/AnimatedMappingInProgressMapperNodeState.ts";
import {AnimatedMappingSucceededMapperNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededMapperNodeState.ts";
import {AnimatedNoInputEdgeAndNoMapperMapperNodeState} from "../animated-no-input-node-and-no-mapper/AnimatedNoInputEdgeAndNoMapperMapperNodeState.ts";
import {InstantNoInputEdgeMapperNodeState} from "../instant-no-input-node/InstantNoInputEdgeMapperNodeState.ts";
import {ManualNoInputEdgeMapperNodeState} from "../manual-no-input-node/ManualNoInputEdgeMapperNodeState.ts";
import {AnimatedNoInputImageMapperNodeState} from "../animated-no-input-node-image/AnimatedNoInputImageMapperNodeState.ts";
export class AnimatedNoInputEdgeMapperNodeState extends MapperNodeState {
	public constructor(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		mapper: Mapper,
	) {
		super("unconfigured");
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
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override makeAnimated(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoInputEdgeMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputEdgeMapperNodeState(
			newIntervalId,
			newIntervalIntervalSeconds,
			this.mapper,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputEdgeMapperNodeState {
		clearInterval(this.intervalId);
		return new InstantNoInputEdgeMapperNodeState(this.mapper);
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputEdgeMapperNodeState {
		clearInterval(this.intervalId);
		return new ManualNoInputEdgeMapperNodeState(this.mapper, stepCount);
	}
	public readonly mapper: Mapper;
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setInputEdgeWithImage(
		thisNode: MapperNode,
		inputNode: Node,
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingInProgressMapperNodeState
		| AnimatedMappingSucceededMapperNodeState {
		const generator = this.mapper.map(inputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				inputNode,
				inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				generator,
				inputNode,
				inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		}
	}
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		inputNode: Node,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageMapperNodeState {
		return new AnimatedNoInputImageMapperNodeState(
			inputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.mapper,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): this {
		return this;
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoInputEdgeMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputEdgeMapperNodeState(
			newIntervalId,
			newIntervalIntervalSeconds,
			this.mapper,
		);
	}
	public override setMapper(
		newMapper: Mapper,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputEdgeMapperNodeState {
		return new AnimatedNoInputEdgeMapperNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
			newMapper,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetInputEdge(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override unsetInputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override unsetMapper(
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputEdgeAndNoMapperMapperNodeState {
		return new AnimatedNoInputEdgeAndNoMapperMapperNodeState(
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
