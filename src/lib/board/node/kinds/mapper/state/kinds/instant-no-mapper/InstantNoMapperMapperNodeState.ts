import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {InstantMappingSucceededMapperNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import {InstantNoInputNodeImageAndNoMapperMapperNodeState} from "../instant-no-input-node-image-and-no-mapper/InstantNoInputNodeImageAndNoMapperMapperNodeState.ts";
import {InstantNoInputNodeAndNoMapperMapperNodeState} from "../instant-no-input-node-and-no-mapper/InstantNoInputNodeAndNoMapperMapperNodeState.ts";
import {ManualNoMapperMapperNodeState} from "../manual-no-mapper/ManualNoMapperMapperNodeState.ts";
import {AnimatedNoMapperMapperNodeState} from "../animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
export class InstantNoMapperMapperNodeState extends MapperNodeState {
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override setInputNodeWithImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): InstantNoMapperMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new InstantNoMapperMapperNodeState(newInputNode, newInputNodeImage);
	}
	public override setMapper(
		mapper: Mapper,
		outputNodes: readonly OutputNode[],
	): InstantMappingSucceededMapperNodeState {
		const generator = mapper.map(this.inputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededMapperNodeState(
					this.inputNode,
					this.inputNodeImage,
					mapper,
					generatorResult.value,
				);
			}
		}
	}
	public override setInputNodeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeImageAndNoMapperMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new InstantNoInputNodeImageAndNoMapperMapperNodeState(newInputNode);
	}
	public override setInputNodeImage(
		newInputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): InstantNoMapperMapperNodeState {
		return new InstantNoMapperMapperNodeState(
			this.inputNode,
			newInputNodeImage,
		);
	}
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeAndNoMapperMapperNodeState {
		return new InstantNoInputNodeAndNoMapperMapperNodeState();
	}
	public override unsetInputNodeImage(
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeImageAndNoMapperMapperNodeState {
		return new InstantNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
		);
	}
	public override unsetMapper(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override makeInstant(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override makeManual(stepCount: number): ManualNoMapperMapperNodeState {
		return new ManualNoMapperMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			stepCount,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoMapperMapperNodeState {
		return new AnimatedNoMapperMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public override doManualSteps(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override doAnimatedStep(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override updateOutputNodeAfterAdding(
		thisNode: MapperNode,
		outputNodeToUpdate: OutputNode,
	): void {
		outputNodeToUpdate.setInputNodeWithoutImage(thisNode);
	}
	private readonly inputNodeImage: ImageData;
	private readonly inputNode: Node;
	public constructor(inputNode: Node, inputNodeImage: ImageData) {
		super("unconfigured");
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
	}
	public override resetOutputImage(outputNodes: readonly OutputNode[]): this {
		return this;
	}
}
