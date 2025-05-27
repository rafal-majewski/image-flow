import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualMappingInProgressMapperNodeState} from "../manual-mapping-in-progress/ManualMappingInProgressMapperNodeState.ts";
import {ManualMappingSucceededMapperNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
import {ManualNoInputImageMapperNodeState} from "../manual-no-input-node-image/ManualNoInputImageMapperNodeState.ts";
import {ManualNoInputEdgeAndNoMapperMapperNodeState} from "../manual-no-input-node-and-no-mapper/ManualNoInputEdgeAndNoMapperMapperNodeState.ts";
import {InstantNoInputEdgeMapperNodeState} from "../instant-no-input-node/InstantNoInputEdgeMapperNodeState.ts";
import {AnimatedNoInputEdgeMapperNodeState} from "../animated-no-input-node/AnimatedNoInputEdgeMapperNodeState.ts";
export class ManualNoInputEdgeMapperNodeState extends MapperNodeState {
	public constructor(mapper: Mapper, stepCount: number) {
		super("unconfigured");
		this.mapper = mapper;
		this.stepCount = stepCount;
	}
	public override doAnimatedStep(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override doManualSteps(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoInputEdgeMapperNodeState {
		return new AnimatedNoInputEdgeMapperNodeState(
			intervalId,
			intervalIntervalSeconds,
			this.mapper,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputEdgeMapperNodeState {
		return new InstantNoInputEdgeMapperNodeState(this.mapper);
	}
	public override makeManual(
		newStepCount: number,
	): ManualNoInputEdgeMapperNodeState {
		return new ManualNoInputEdgeMapperNodeState(this.mapper, newStepCount);
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
		| ManualMappingInProgressMapperNodeState
		| ManualMappingSucceededMapperNodeState {
		const newGenerator = this.mapper.map(inputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new ManualMappingSucceededMapperNodeState(
				inputNode,
				inputNodeImage,
				this.mapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualMappingInProgressMapperNodeState(
				newGenerator,
				inputNode,
				inputNodeImage,
				this.mapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		}
	}
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		inputNode: Node,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageMapperNodeState {
		return new ManualNoInputImageMapperNodeState(
			inputNode,
			this.mapper,
			this.stepCount,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): this {
		return this;
	}
	public override setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override setMapper(
		newMapper: Mapper,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputEdgeMapperNodeState {
		return new ManualNoInputEdgeMapperNodeState(newMapper, this.stepCount);
	}
	public override setStepCount(
		newStepCount: number,
	): ManualNoInputEdgeMapperNodeState {
		return new ManualNoInputEdgeMapperNodeState(this.mapper, newStepCount);
	}
	public readonly stepCount: number;
	public override unsetInputEdge(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override unsetInputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override unsetMapper(
		outputEdges: readonly OutputEdge[],
	): ManualNoInputEdgeAndNoMapperMapperNodeState {
		return new ManualNoInputEdgeAndNoMapperMapperNodeState(this.stepCount);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: MapperNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
