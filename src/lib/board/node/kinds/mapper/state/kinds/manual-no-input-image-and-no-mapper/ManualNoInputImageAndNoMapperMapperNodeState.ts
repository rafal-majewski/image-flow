import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualNoMapperMapperNodeState} from "../manual-no-mapper/ManualNoMapperMapperNodeState.ts";
import type {OutputEdge} from "../../../../../../edge/types/output/OutputEdge.ts";
import type {InputEdge} from "../../../../../../edge/types/input/InputEdge.ts";
import {AnimatedNoInputImageAndNoMapperMapperNodeState} from "../animated-no-input-image-and-no-mapper/AnimatedNoInputImageAndNoMapperMapperNodeState.ts";
import {InstantNoInputImageAndNoMapperMapperNodeState} from "../instant-no-input-image-and-no-mapper/InstantNoInputImageAndNoMapperMapperNodeState.ts";
import {ManualNoInputEdgeAndNoMapperMapperNodeState} from "../manual-no-input-edge-and-no-mapper/ManualNoInputEdgeAndNoMapperMapperNodeState.ts";
import {ManualNoInputEdgeMapperNodeState} from "../manual-no-input-edge/ManualNoInputEdgeMapperNodeState.ts";
export class ManualNoInputImageAndNoMapperMapperNodeState extends MapperNodeState {
	public constructor(inputEdge: InputEdge, stepCount: number) {
		super("unconfigured");
		this.inputEdge = inputEdge;
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
	): AnimatedNoInputImageAndNoMapperMapperNodeState {
		return new AnimatedNoInputImageAndNoMapperMapperNodeState(
			this.inputEdge,
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageAndNoMapperMapperNodeState {
		return new InstantNoInputImageAndNoMapperMapperNodeState(this.inputEdge);
	}
	public override makeManual(
		newStepCount: number,
	): ManualNoInputImageAndNoMapperMapperNodeState {
		return new ManualNoInputImageAndNoMapperMapperNodeState(
			this.inputEdge,
			newStepCount,
		);
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
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageAndNoMapperMapperNodeState {
		return new ManualNoInputImageAndNoMapperMapperNodeState(
			newInputNode,
			this.stepCount,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): ManualNoMapperMapperNodeState {
		return new ManualNoMapperMapperNodeState(
			this.inputEdge,
			inputNodeImage,
			this.stepCount,
		);
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
	): ManualNoInputImageAndNoMapperMapperNodeState {
		return new ManualNoInputImageAndNoMapperMapperNodeState(
			this.inputEdge,
			this.stepCount,
		);
	}
	public readonly stepCount: number;
	public override unsetInputEdge(
		outputEdges: readonly OutputEdge[],
	): ManualNoInputEdgeAndNoMapperMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new ManualNoInputEdgeAndNoMapperMapperNodeState(this.stepCount);
	}
	public override unsetInputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override unsetMapper(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override updateOutputEdgeAfterAdding(
		outputEdgeBuilder2: OutputEdgeBuilder2,
	): OutputEdge {
		return outputEdgeBuilder2.buildWithoutImage();
	}
}
