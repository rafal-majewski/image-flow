import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualMappingSucceededMapperNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
import {ManualMappingInProgressMapperNodeState} from "../manual-mapping-in-progress/ManualMappingInProgressMapperNodeState.ts";
import {ManualNoInputNodeMapperNodeState} from "../manual-no-input-node/ManualNoInputNodeMapperNodeState.ts";
import {ManualNoInputNodeImageAndNoMapperMapperNodeState} from "../manual-no-input-node-image-and-no-mapper/ManualNoInputNodeImageAndNoMapperMapperNodeState.ts";
import {InstantNoInputNodeImageMapperNodeState} from "../instant-no-input-node-image/InstantNoInputNodeImageMapperNodeState.ts";
import {AnimatedNoInputNodeImageMapperNodeState} from "../animated-no-input-node-image/AnimatedNoInputNodeImageMapperNodeState.ts";
export class ManualNoInputNodeImageMapperNodeState extends MapperNodeState {
	public override setStepCount(
		newStepCount: number,
	): ManualNoInputNodeImageMapperNodeState {
		return new ManualNoInputNodeImageMapperNodeState(
			this.inputNode,
			this.mapper,
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
	):
		| ManualMappingInProgressMapperNodeState
		| ManualMappingSucceededMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		const generator = this.mapper.map(newInputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new ManualMappingSucceededMapperNodeState(
				newInputNode,
				newInputNodeImage,
				this.mapper,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualMappingInProgressMapperNodeState(
				generator,
				newInputNode,
				newInputNodeImage,
				this.mapper,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	public override setMapper(
		newMapper: Mapper,
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeImageMapperNodeState {
		return new ManualNoInputNodeImageMapperNodeState(
			this.inputNode,
			newMapper,
			this.stepCount,
		);
	}
	public override setInputNodeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeImageMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new ManualNoInputNodeImageMapperNodeState(
			newInputNode,
			this.mapper,
			this.stepCount,
		);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	):
		| ManualMappingInProgressMapperNodeState
		| ManualMappingSucceededMapperNodeState {
		const generator = this.mapper.map(inputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new ManualMappingSucceededMapperNodeState(
				this.inputNode,
				inputNodeImage,
				this.mapper,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualMappingInProgressMapperNodeState(
				generator,
				this.inputNode,
				inputNodeImage,
				this.mapper,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new ManualNoInputNodeMapperNodeState(this.mapper, this.stepCount);
	}
	public override unsetInputNodeImage(
		outputNodes: readonly OutputNode[],
	): this {
		return this;
	}
	public override unsetMapper(
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeImageAndNoMapperMapperNodeState {
		return new ManualNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
			this.stepCount,
		);
	}
	public override makeInstant(
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeImageMapperNodeState {
		return new InstantNoInputNodeImageMapperNodeState(
			this.inputNode,
			this.mapper,
		);
	}
	public override makeManual(
		newStepCount: number,
	): ManualNoInputNodeImageMapperNodeState {
		return new ManualNoInputNodeImageMapperNodeState(
			this.inputNode,
			this.mapper,
			newStepCount,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoInputNodeImageMapperNodeState {
		return new AnimatedNoInputNodeImageMapperNodeState(
			this.inputNode,
			intervalId,
			intervalIntervalSeconds,
			this.mapper,
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
	public readonly mapper: Mapper;
	private readonly inputNode: Node;
	public constructor(inputNode: Node, mapper: Mapper, stepCount: number) {
		super("idling");
		this.inputNode = inputNode;
		this.mapper = mapper;
		this.stepCount = stepCount;
	}
	public readonly stepCount: number;
}
