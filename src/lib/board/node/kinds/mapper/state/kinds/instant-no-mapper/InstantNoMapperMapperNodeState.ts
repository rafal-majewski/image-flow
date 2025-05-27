import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {InstantMappingSucceededMapperNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import {InstantNoInputImageAndNoMapperMapperNodeState} from "../instant-no-input-node-image-and-no-mapper/InstantNoInputImageAndNoMapperMapperNodeState.ts";
import {InstantNoInputEdgeAndNoMapperMapperNodeState} from "../instant-no-input-node-and-no-mapper/InstantNoInputEdgeAndNoMapperMapperNodeState.ts";
import {ManualNoMapperMapperNodeState} from "../manual-no-mapper/ManualNoMapperMapperNodeState.ts";
import {AnimatedNoMapperMapperNodeState} from "../animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
export class InstantNoMapperMapperNodeState extends MapperNodeState {
	public constructor(inputEdge: InputEdge, inputNodeImage: ImageData) {
		super("unconfigured");
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
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
	public override makeInstant(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override makeManual(stepCount: number): ManualNoMapperMapperNodeState {
		return new ManualNoMapperMapperNodeState(
			this.inputEdge,
			this.inputNodeImage,
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
		this.inputEdge.disconnectFromInputNode();
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
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): InstantNoMapperMapperNodeState {
		return new InstantNoMapperMapperNodeState(
			this.inputEdge,
			newInputNodeImage,
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
	): InstantMappingSucceededMapperNodeState {
		const generator = mapper.map(this.inputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededMapperNodeState(
					this.inputEdge,
					this.inputNodeImage,
					mapper,
					generatorResult.value,
				);
			}
		}
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetInputEdge(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputEdgeAndNoMapperMapperNodeState {
		return new InstantNoInputEdgeAndNoMapperMapperNodeState();
	}
	public override unsetInputImage(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageAndNoMapperMapperNodeState {
		return new InstantNoInputImageAndNoMapperMapperNodeState(this.inputEdge);
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
