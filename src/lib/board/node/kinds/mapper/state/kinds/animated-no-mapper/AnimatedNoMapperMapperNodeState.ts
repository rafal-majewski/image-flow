import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {AnimatedMappingInProgressMapperNodeState} from "../animated-mapping-in-progress/AnimatedMappingInProgressMapperNodeState.ts";
import {AnimatedMappingSucceededMapperNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededMapperNodeState.ts";
import {AnimatedNoInputNodeAndNoMapperMapperNodeState} from "../animated-no-input-node-and-no-mapper/AnimatedNoInputNodeAndNoMapperMapperNodeState.ts";
import {InstantNoMapperMapperNodeState} from "../instant-no-mapper/InstantNoMapperMapperNodeState.ts";
import {ManualNoMapperMapperNodeState} from "../manual-no-mapper/ManualNoMapperMapperNodeState.ts";
import {AnimatedNoInputNodeImageAndNoMapperMapperNodeState} from "../animated-no-input-node-image-and-no-mapper/AnimatedNoInputNodeImageAndNoMapperMapperNodeState.ts";
export class AnimatedNoMapperMapperNodeState extends MapperNodeState {
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoMapperMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			newIntervalId,
			newIntervalIntervalSeconds,
		);
	}
	public override setInputNodeWithImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): AnimatedNoMapperMapperNodeState {
		return new AnimatedNoMapperMapperNodeState(
			newInputNode,
			newInputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setMapper(
		mapper: Mapper,
		outputNodes: readonly OutputNode[],
	):
		| AnimatedMappingInProgressMapperNodeState
		| AnimatedMappingSucceededMapperNodeState {
		const generator = mapper.map(this.inputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				this.inputNode,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				mapper,
				generatorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				generator,
				this.inputNode,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				mapper,
				generatorResult.value,
			);
		}
	}
	public override setInputNodeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeImageAndNoMapperMapperNodeState {
		return new AnimatedNoInputNodeImageAndNoMapperMapperNodeState(
			newInputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setInputNodeImage(
		newInputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): AnimatedNoMapperMapperNodeState {
		return new AnimatedNoMapperMapperNodeState(
			this.inputNode,
			newInputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeAndNoMapperMapperNodeState {
		return new AnimatedNoInputNodeAndNoMapperMapperNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override unsetInputNodeImage(
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeImageAndNoMapperMapperNodeState {
		return new AnimatedNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override unsetMapper(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override makeInstant(
		outputNodes: readonly OutputNode[],
	): InstantNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new InstantNoMapperMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
		);
	}
	public override makeManual(stepCount: number): ManualNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new ManualNoMapperMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			stepCount,
		);
	}
	public override makeAnimated(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedNoMapperMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoMapperMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			newIntervalId,
			newIntervalIntervalSeconds,
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
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	) {
		super("unconfigured");
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
	}
	private readonly inputNodeImage: ImageData;
	private readonly inputNode: Node;
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override resetOutputImage(outputNodes: readonly OutputNode[]): this {
		return this;
	}
}
