import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {InstantMappingSucceededMapperNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import {InstantNoInputImageAndNoMapperMapperNodeState} from "../instant-no-input-node-image-and-no-mapper/InstantNoInputImageAndNoMapperMapperNodeState.ts";
import {ManualNoInputImageMapperNodeState} from "../manual-no-input-node-image/ManualNoInputImageMapperNodeState.ts";
import {AnimatedNoInputImageMapperNodeState} from "../animated-no-input-node-image/AnimatedNoInputImageMapperNodeState.ts";
export class InstantNoInputImageMapperNodeState extends MapperNodeState {
	public constructor(inputEdge: InputEdge, mapper: Mapper) {
		super("idling");
		this.inputNode = inputNode;
		this.mapper = mapper;
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
	public override makeInstant(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputImageMapperNodeState {
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
	): InstantMappingSucceededMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		const generator = this.mapper.map(newInputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededMapperNodeState(
					newInputNode,
					newInputNodeImage,
					this.mapper,
					generatorResult.value,
				);
			}
		}
	}
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageMapperNodeState {
		return new InstantNoInputImageMapperNodeState(newInputNode, this.mapper);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): InstantMappingSucceededMapperNodeState {
		const generator = this.mapper.map(inputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededMapperNodeState(
					this.inputEdge,
					inputNodeImage,
					this.mapper,
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
	public override setMapper(
		newMapper: Mapper,
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageMapperNodeState {
		return new InstantNoInputImageMapperNodeState(this.inputEdge, newMapper);
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
	): InstantNoInputImageAndNoMapperMapperNodeState {
		return new InstantNoInputImageAndNoMapperMapperNodeState(this.inputEdge);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: MapperNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
