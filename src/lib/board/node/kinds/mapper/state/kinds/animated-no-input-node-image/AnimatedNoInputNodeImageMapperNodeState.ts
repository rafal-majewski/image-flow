import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {AnimatedMappingInProgressMapperNodeState} from "../animated-mapping-in-progress/AnimatedMappingInProgressMapperNodeState.ts";
import {AnimatedMappingSucceededMapperNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededMapperNodeState.ts";
import {AnimatedNoInputNodeImageAndNoMapperMapperNodeState} from "../animated-no-input-node-image-and-no-mapper/AnimatedNoInputNodeImageAndNoMapperMapperNodeState.ts";
import {AnimatedNoInputNodeMapperNodeState} from "../animated-no-input-node/AnimatedNoInputNodeMapperNodeState.ts";
import {InstantNoInputNodeImageMapperNodeState} from "../instant-no-input-node-image/InstantNoInputNodeImageMapperNodeState.ts";
import {ManualNoInputNodeImageMapperNodeState} from "../manual-no-input-node-image/ManualNoInputNodeImageMapperNodeState.ts";
export class AnimatedNoInputNodeImageMapperNodeState extends MapperNodeState {
	public override setInputNodeWithImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	):
		| AnimatedMappingSucceededMapperNodeState
		| AnimatedMappingInProgressMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		const generator = this.mapper.map(newInputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				newInputNode,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				generator,
				newInputNode,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		}
	}
	public override setMapper(
		newMapper: Mapper,
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeImageMapperNodeState {
		return new AnimatedNoInputNodeImageMapperNodeState(
			this.inputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
			newMapper,
		);
	}
	public override setInputNodeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeImageMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new AnimatedNoInputNodeImageMapperNodeState(
			newInputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.mapper,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	):
		| AnimatedMappingSucceededMapperNodeState
		| AnimatedMappingInProgressMapperNodeState {
		const generator = this.mapper.map(inputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				this.inputNode,
				inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				generator,
				this.inputNode,
				inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		}
	}
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new AnimatedNoInputNodeMapperNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
			this.mapper,
		);
	}
	public override unsetInputNodeImage(
		outputNodes: readonly OutputNode[],
	): this {
		return this;
	}
	public override unsetMapper(
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeImageAndNoMapperMapperNodeState {
		return new AnimatedNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override makeInstant(
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeImageMapperNodeState {
		clearInterval(this.intervalId);
		return new InstantNoInputNodeImageMapperNodeState(
			this.inputNode,
			this.mapper,
		);
	}
	public override makeManual(
		stepCount: number,
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeImageMapperNodeState {
		clearInterval(this.intervalId);
		return new ManualNoInputNodeImageMapperNodeState(
			this.inputNode,
			this.mapper,
			stepCount,
		);
	}
	public override makeAnimated(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeImageMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputNodeImageMapperNodeState(
			this.inputNode,
			newIntervalId,
			newIntervalIntervalSeconds,
			this.mapper,
		);
	}
	public override doStep(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override updateOutputNodeAfterAdding(
		thisNode: MapperNode,
		outputNodeToUpdate: OutputNode,
	): void {
		outputNodeToUpdate.setInputNodeWithoutImage(thisNode);
	}
	private readonly inputNode: Node;
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public readonly mapper: Mapper;
	public constructor(
		inputNode: Node,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		mapper: Mapper,
	) {
		super("idling");
		this.inputNode = inputNode;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
		this.mapper = mapper;
	}
}
