import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {InstantNoMapperMapperNodeState} from "../instant-no-mapper/InstantNoMapperMapperNodeState.ts";
import {InstantNoInputImageMapperNodeState} from "../instant-no-input-node-image/InstantNoInputImageMapperNodeState.ts";
import {ManualNoInputImageAndNoMapperMapperNodeState} from "../manual-no-input-node-image-and-no-mapper/ManualNoInputImageAndNoMapperMapperNodeState.ts";
import {AnimatedNoInputImageAndNoMapperMapperNodeState} from "../animated-no-input-node-image-and-no-mapper/AnimatedNoInputImageAndNoMapperMapperNodeState.ts";
export class InstantNoInputImageAndNoMapperMapperNodeState extends MapperNodeState {
	public constructor(inputEdge: InputEdge) {
		super("unconfigured");
		this.inputNode = inputNode;
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
	): AnimatedNoInputImageAndNoMapperMapperNodeState {
		return new AnimatedNoInputImageAndNoMapperMapperNodeState(
			this.inputEdge,
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public override makeInstant(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualNoInputImageAndNoMapperMapperNodeState {
		return new ManualNoInputImageAndNoMapperMapperNodeState(
			this.inputEdge,
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
	): InstantNoMapperMapperNodeState {
		return new InstantNoMapperMapperNodeState(newInputNode, newInputNodeImage);
	}
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageAndNoMapperMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new InstantNoInputImageAndNoMapperMapperNodeState(newInputNode);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): InstantNoMapperMapperNodeState {
		return new InstantNoMapperMapperNodeState(this.inputNode, inputNodeImage);
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
	): InstantNoInputImageMapperNodeState {
		return new InstantNoInputImageMapperNodeState(this.inputNode, mapper);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetInputEdge(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageAndNoMapperMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new InstantNoInputImageAndNoMapperMapperNodeState(this.inputEdge);
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
