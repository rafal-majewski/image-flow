import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {AnimatedMappingInProgressMapperNodeState} from "../animated-mapping-in-progress/AnimatedMappingInProgressMapperNodeState.ts";
import {AnimatedMappingSucceededMapperNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededMapperNodeState.ts";
import {AnimatedNoInputImageAndNoMapperMapperNodeState} from "../animated-no-input-image-and-no-mapper/AnimatedNoInputImageAndNoMapperMapperNodeState.ts";
import {AnimatedNoInputNodeMapperNodeState} from "../animated-no-input-node/AnimatedNoInputNodeMapperNodeState.ts";
import {InstantNoInputImageMapperNodeState} from "../instant-no-input-image/InstantNoInputImageMapperNodeState.ts";
import {ManualNoInputImageMapperNodeState} from "../manual-no-input-image/ManualNoInputImageMapperNodeState.ts";
export class AnimatedNoInputImageMapperNodeState extends MapperNodeState {
	public override setInputNodeWithInputImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputImage: ImageData,
		outputNodes: readonly OutputNode[],
	):
		| AnimatedMappingSucceededMapperNodeState
		| AnimatedMappingInProgressMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		const generator = this.mapper.map(newInputImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputImage(generatorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				newInputImage,
				newInputNode,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				generator,
				newInputImage,
				newInputNode,
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
	): AnimatedNoInputImageMapperNodeState {
		return new AnimatedNoInputImageMapperNodeState(
			this.inputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
			newMapper,
		);
	}
	public override setInputNodeWithoutInputImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputImageMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new AnimatedNoInputImageMapperNodeState(
			newInputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.mapper,
		);
	}
	public override setInputImage(
		inputImage: ImageData,
		outputNodes: readonly OutputNode[],
	):
		| AnimatedMappingSucceededMapperNodeState
		| AnimatedMappingInProgressMapperNodeState {
		const generator = this.mapper.map(inputImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputImage(generatorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				inputImage,
				this.inputNode,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				generator,
				inputImage,
				this.inputNode,
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
	public override unsetInputImage(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override unsetMapper(
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputImageAndNoMapperMapperNodeState {
		return new AnimatedNoInputImageAndNoMapperMapperNodeState(
			this.inputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override makeInstant(
		outputNodes: readonly OutputNode[],
	): InstantNoInputImageMapperNodeState {
		clearInterval(this.intervalId);
		return new InstantNoInputImageMapperNodeState(this.inputNode, this.mapper);
	}
	public override makeManual(
		stepCount: number,
		outputNodes: readonly OutputNode[],
	): ManualNoInputImageMapperNodeState {
		clearInterval(this.intervalId);
		return new ManualNoInputImageMapperNodeState(
			this.inputNode,
			this.mapper,
			stepCount,
		);
	}
	public override makeAnimated(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputImageMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedNoInputImageMapperNodeState(
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
		outputNodeToUpdate.setInputNodeWithoutInputImage(thisNode);
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
