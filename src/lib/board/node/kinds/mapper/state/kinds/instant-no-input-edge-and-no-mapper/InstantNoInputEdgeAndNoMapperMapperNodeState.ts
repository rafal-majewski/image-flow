import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {InstantNoMapperMapperNodeState} from "../instant-no-mapper/InstantNoMapperMapperNodeState.ts";
import {InstantNoInputEdgeMapperNodeState} from "../instant-no-input-node/InstantNoInputEdgeMapperNodeState.ts";
import {InstantNoInputImageAndNoMapperMapperNodeState} from "../instant-no-input-node-image-and-no-mapper/InstantNoInputImageAndNoMapperMapperNodeState.ts";
import {ManualNoInputEdgeAndNoMapperMapperNodeState} from "../manual-no-input-node-and-no-mapper/ManualNoInputEdgeAndNoMapperMapperNodeState.ts";
import {AnimatedNoInputEdgeAndNoMapperMapperNodeState} from "../animated-no-input-node-and-no-mapper/AnimatedNoInputEdgeAndNoMapperMapperNodeState.ts";
export class InstantNoInputEdgeAndNoMapperMapperNodeState extends MapperNodeState {
	public constructor() {
		super("unconfigured");
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
	): AnimatedNoInputEdgeAndNoMapperMapperNodeState {
		return new AnimatedNoInputEdgeAndNoMapperMapperNodeState(
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public override makeInstant(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputEdgeAndNoMapperMapperNodeState {
		return new ManualNoInputEdgeAndNoMapperMapperNodeState(stepCount);
	}
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setInputEdgeWithImage(
		thisNode: MapperNode,
		inputNode: Node,
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): InstantNoMapperMapperNodeState {
		return new InstantNoMapperMapperNodeState(inputNode, inputNodeImage);
	}
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		inputNode: Node,
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageAndNoMapperMapperNodeState {
		return new InstantNoInputImageAndNoMapperMapperNodeState(inputNode);
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
		mapper: Mapper,
		outputEdges: readonly OutputEdge[],
	): InstantNoInputEdgeMapperNodeState {
		return new InstantNoInputEdgeMapperNodeState(mapper);
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
