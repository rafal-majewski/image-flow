import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {ManualNoMapperMapperNodeState} from "../manual-no-mapper/ManualNoMapperMapperNodeState.ts";
import {ManualNoInputEdgeMapperNodeState} from "../manual-no-input-node/ManualNoInputEdgeMapperNodeState.ts";
import {ManualNoInputImageAndNoMapperMapperNodeState} from "../manual-no-input-node-image-and-no-mapper/ManualNoInputImageAndNoMapperMapperNodeState.ts";
import {InstantNoInputEdgeAndNoMapperMapperNodeState} from "../instant-no-input-node-and-no-mapper/InstantNoInputEdgeAndNoMapperMapperNodeState.ts";
import {AnimatedNoInputEdgeAndNoMapperMapperNodeState} from "../animated-no-input-node-and-no-mapper/AnimatedNoInputEdgeAndNoMapperMapperNodeState.ts";
export class ManualNoInputEdgeAndNoMapperMapperNodeState extends MapperNodeState {
	public constructor(stepCount: number) {
		super("unconfigured");
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
	): AnimatedNoInputEdgeAndNoMapperMapperNodeState {
		return new AnimatedNoInputEdgeAndNoMapperMapperNodeState(
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputEdgeAndNoMapperMapperNodeState {
		return new InstantNoInputEdgeAndNoMapperMapperNodeState();
	}
	public override makeManual(
		newStepCount: number,
	): ManualNoInputEdgeAndNoMapperMapperNodeState {
		return new ManualNoInputEdgeAndNoMapperMapperNodeState(newStepCount);
	}
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setInputEdgeWithImage(
		thisNode: MapperNode,
		inputNode: Node,
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): ManualNoMapperMapperNodeState {
		return new ManualNoMapperMapperNodeState(
			inputNode,
			inputNodeImage,
			this.stepCount,
		);
	}
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		inputNode: Node,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageAndNoMapperMapperNodeState {
		return new ManualNoInputImageAndNoMapperMapperNodeState(
			inputNode,
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
		mapper: Mapper,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputEdgeMapperNodeState {
		return new ManualNoInputEdgeMapperNodeState(mapper, this.stepCount);
	}
	public override setStepCount(
		newStepCount: number,
	): ManualNoInputEdgeAndNoMapperMapperNodeState {
		return new ManualNoInputEdgeAndNoMapperMapperNodeState(newStepCount);
	}
	public readonly stepCount: number;
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
