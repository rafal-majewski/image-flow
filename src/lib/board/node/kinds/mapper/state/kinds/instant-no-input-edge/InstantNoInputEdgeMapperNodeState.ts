import type {Node} from "../../../../../Node.svelte.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {OutputNode} from "../../../../../OutputNode.ts";
import {InstantMappingSucceededMapperNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import {InstantNoInputImageMapperNodeState} from "../instant-no-input-node-image/InstantNoInputImageMapperNodeState.ts";
import {InstantNoInputEdgeAndNoMapperMapperNodeState} from "../instant-no-input-node-and-no-mapper/InstantNoInputEdgeAndNoMapperMapperNodeState.ts";
import {ManualNoInputEdgeMapperNodeState} from "../manual-no-input-node/ManualNoInputEdgeMapperNodeState.ts";
import {AnimatedNoInputEdgeMapperNodeState} from "../animated-no-input-node/AnimatedNoInputEdgeMapperNodeState.ts";
export class InstantNoInputEdgeMapperNodeState extends MapperNodeState {
	public constructor(mapper: Mapper) {
		super("unconfigured");
		this.mapper = mapper;
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
	public override makeInstant(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputEdgeMapperNodeState {
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
	): InstantMappingSucceededMapperNodeState {
		const generator = this.mapper.map(inputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededMapperNodeState(
					inputNode,
					inputNodeImage,
					this.mapper,
					generatorResult.value,
				);
			}
		}
	}
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		inputNode: Node,
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageMapperNodeState {
		return new InstantNoInputImageMapperNodeState(inputNode, this.mapper);
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
	): InstantNoInputEdgeMapperNodeState {
		return new InstantNoInputEdgeMapperNodeState(newMapper);
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
	): InstantNoInputEdgeAndNoMapperMapperNodeState {
		return new InstantNoInputEdgeAndNoMapperMapperNodeState();
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: MapperNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
