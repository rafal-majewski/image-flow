import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualMappingSucceededMapperNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
import {ManualMappingInProgressMapperNodeState} from "../manual-mapping-in-progress/ManualMappingInProgressMapperNodeState.ts";
import type {OutputEdge} from "../../../../../../edge/types/output/OutputEdge.ts";
import type {InputEdge} from "../../../../../../edge/types/input/InputEdge.ts";
import {AnimatedNoInputImageMapperNodeState} from "../animated-no-input-edge-image/AnimatedNoInputNodeImageMapperNodeState.ts";
import {InstantNoInputImageMapperNodeState} from "../instant-no-input-edge-image/InstantNoInputNodeImageMapperNodeState.ts";
export class ManualNoInputImageMapperNodeState extends MapperNodeState {
	public constructor(inputEdge: InputEdge, mapper: Mapper, stepCount: number) {
		super("idling");
		this.inputEdge = inputEdge;
		this.mapper = mapper;
		this.stepCount = stepCount;
	}
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
	): AnimatedNoInputImageMapperNodeState {
		return new AnimatedNoInputImageMapperNodeState(
			this.inputEdge,
			intervalId,
			intervalIntervalSeconds,
			this.mapper,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageMapperNodeState {
		return new InstantNoInputImageMapperNodeState(this.inputEdge, this.mapper);
	}
	public override makeManual(
		newStepCount: number,
	): ManualNoInputImageMapperNodeState {
		return new ManualNoInputImageMapperNodeState(
			this.inputEdge,
			this.mapper,
			newStepCount,
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
		| ManualMappingInProgressMapperNodeState
		| ManualMappingSucceededMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		const generator = this.mapper.map(newInputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new ManualMappingSucceededMapperNodeState(
				newInputNode,
				newInputNodeImage,
				this.mapper,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualMappingInProgressMapperNodeState(
				generator,
				newInputNode,
				newInputNodeImage,
				this.mapper,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new ManualNoInputImageMapperNodeState(
			newInputNode,
			this.mapper,
			this.stepCount,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	):
		| ManualMappingInProgressMapperNodeState
		| ManualMappingSucceededMapperNodeState {
		const generator = this.mapper.map(inputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputEdge of outputEdges) {
				outputEdge.setImage(generatorResult.value);
			}
			return new ManualMappingSucceededMapperNodeState(
				this.inputEdge,
				inputNodeImage,
				this.mapper,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualMappingInProgressMapperNodeState(
				generator,
				this.inputEdge,
				inputNodeImage,
				this.mapper,
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
	public override setMapper(
		newMapper: Mapper,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageMapperNodeState {
		return new ManualNoInputImageMapperNodeState(
			this.inputEdge,
			newMapper,
			this.stepCount,
		);
	}
	public override setStepCount(
		newStepCount: number,
	): ManualNoInputImageMapperNodeState {
		return new ManualNoInputImageMapperNodeState(
			this.inputEdge,
			this.mapper,
			newStepCount,
		);
	}
	public readonly stepCount: number;
	public override unsetInputEdge(
		outputEdges: readonly OutputEdge[],
	): ManualNoInputEdgeMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new ManualNoInputEdgeMapperNodeState(this.mapper, this.stepCount);
	}
	public override unsetInputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override unsetMapper(
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageAndNoMapperMapperNodeState {
		return new ManualNoInputImageAndNoMapperMapperNodeState(
			this.inputEdge,
			this.stepCount,
		);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: MapperNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
