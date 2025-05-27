import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualMappingSucceededMapperNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
import {ManualMappingInProgressMapperNodeState} from "../manual-mapping-in-progress/ManualMappingInProgressMapperNodeState.ts";
import {ManualNoInputImageAndNoMapperMapperNodeState} from "../manual-no-input-node-image-and-no-mapper/ManualNoInputImageAndNoMapperMapperNodeState.ts";
import {ManualNoInputEdgeAndNoMapperMapperNodeState} from "../manual-no-input-node-and-no-mapper/ManualNoInputEdgeAndNoMapperMapperNodeState.ts";
import {InstantNoMapperMapperNodeState} from "../instant-no-mapper/InstantNoMapperMapperNodeState.ts";
import {AnimatedNoMapperMapperNodeState} from "../animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
export class ManualNoMapperMapperNodeState extends MapperNodeState {
	public constructor(
		inputEdge: InputEdge,
		inputNodeImage: ImageData,
		stepCount: number,
	) {
		super("unconfigured");
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
		this.stepCount = stepCount;
	}
	public override doAnimatedStep(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override doManualSteps(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	private readonly inputEdge: InputEdge;
	private readonly inputNodeImage: ImageData;
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoMapperMapperNodeState {
		return new AnimatedNoMapperMapperNodeState(
			this.inputEdge,
			this.inputNodeImage,
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantNoMapperMapperNodeState {
		return new InstantNoMapperMapperNodeState(
			this.inputEdge,
			this.inputNodeImage,
		);
	}
	public override makeManual(
		newStepCount: number,
	): ManualNoMapperMapperNodeState {
		return new ManualNoMapperMapperNodeState(
			this.inputEdge,
			this.inputNodeImage,
			newStepCount,
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
	): ManualNoMapperMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new ManualNoMapperMapperNodeState(
			newInputNode,
			newInputNodeImage,
			this.stepCount,
		);
	}
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageAndNoMapperMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new ManualNoInputImageAndNoMapperMapperNodeState(
			newInputNode,
			this.stepCount,
		);
	}
	public override setInputNodeImage(
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): ManualNoMapperMapperNodeState {
		return new ManualNoMapperMapperNodeState(
			this.inputEdge,
			newInputNodeImage,
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
	):
		| ManualMappingInProgressMapperNodeState
		| ManualMappingSucceededMapperNodeState {
		const generator = mapper.map(this.inputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new ManualMappingSucceededMapperNodeState(
				this.inputEdge,
				this.inputNodeImage,
				mapper,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualMappingInProgressMapperNodeState(
				generator,
				this.inputEdge,
				this.inputNodeImage,
				mapper,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	public override setStepCount(
		newStepCount: number,
	): ManualNoMapperMapperNodeState {
		return new ManualNoMapperMapperNodeState(
			this.inputEdge,
			this.inputNodeImage,
			newStepCount,
		);
	}
	public readonly stepCount: number;
	public override unsetInputEdge(
		outputEdges: readonly OutputEdge[],
	): ManualNoInputEdgeAndNoMapperMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new ManualNoInputEdgeAndNoMapperMapperNodeState(this.stepCount);
	}
	public override unsetInputImage(
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageAndNoMapperMapperNodeState {
		return new ManualNoInputImageAndNoMapperMapperNodeState(
			this.inputEdge,
			this.stepCount,
		);
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
