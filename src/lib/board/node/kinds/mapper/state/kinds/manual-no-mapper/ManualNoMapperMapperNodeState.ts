import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualMappingSucceededMapperNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
import {ManualMappingInProgressMapperNodeState} from "../manual-mapping-in-progress/ManualMappingInProgressMapperNodeState.ts";
import {ManualNoInputNodeImageAndNoMapperMapperNodeState} from "../manual-no-input-node-image-and-no-mapper/ManualNoInputNodeImageAndNoMapperMapperNodeState.ts";
import {ManualNoInputNodeAndNoMapperMapperNodeState} from "../manual-no-input-node-and-no-mapper/ManualNoInputNodeAndNoMapperMapperNodeState.ts";
import {InstantNoMapperMapperNodeState} from "../instant-no-mapper/InstantNoMapperMapperNodeState.ts";
import {AnimatedNoMapperMapperNodeState} from "../animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
export class ManualNoMapperMapperNodeState extends MapperNodeState {
	public override setStepCount(
		newStepCount: number,
	): ManualNoMapperMapperNodeState {
		return new ManualNoMapperMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			newStepCount,
		);
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
	): ManualNoMapperMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new ManualNoMapperMapperNodeState(
			newInputNode,
			newInputNodeImage,
			this.stepCount,
		);
	}
	public override setMapper(
		mapper: Mapper,
		outputNodes: readonly OutputNode[],
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
				this.inputNode,
				this.inputNodeImage,
				mapper,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualMappingInProgressMapperNodeState(
				generator,
				this.inputNode,
				this.inputNodeImage,
				mapper,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	public override setInputNodeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeImageAndNoMapperMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new ManualNoInputNodeImageAndNoMapperMapperNodeState(
			newInputNode,
			this.stepCount,
		);
	}
	public override setInputNodeImage(
		newInputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): ManualNoMapperMapperNodeState {
		return new ManualNoMapperMapperNodeState(
			this.inputNode,
			newInputNodeImage,
			this.stepCount,
		);
	}
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeAndNoMapperMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new ManualNoInputNodeAndNoMapperMapperNodeState(this.stepCount);
	}
	public override unsetInputNodeImage(
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeImageAndNoMapperMapperNodeState {
		return new ManualNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
			this.stepCount,
		);
	}
	public override unsetMapper(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override makeInstant(
		outputNodes: readonly OutputNode[],
	): InstantNoMapperMapperNodeState {
		return new InstantNoMapperMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
		);
	}
	public override makeManual(
		newStepCount: number,
	): ManualNoMapperMapperNodeState {
		return new ManualNoMapperMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			newStepCount,
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
	public constructor(
		inputNode: Node,
		inputNodeImage: ImageData,
		stepCount: number,
	) {
		super("unconfigured");
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
		this.stepCount = stepCount;
	}
	private readonly inputNodeImage: ImageData;
	private readonly inputNode: Node;
	public readonly stepCount: number;
	public override resetOutputImage(outputNodes: readonly OutputNode[]): this {
		return this;
	}
}
