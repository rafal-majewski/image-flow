import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {InstantMappingSucceededMapperNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import {ManualMappingInProgressMapperNodeState} from "../manual-mapping-in-progress/ManualMappingInProgressMapperNodeState.ts";
import {AnimatedMappingSucceededMapperNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededMapperNodeState.ts";
import {AnimatedNoInputImageMapperNodeState} from "../animated-no-input-image/AnimatedNoInputImageMapperNodeState.ts";
import {AnimatedNoInputNodeMapperNodeState} from "../animated-no-input-node/AnimatedNoInputNodeMapperNodeState.ts";
import {AnimatedNoMapperMapperNodeState} from "../animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
export class AnimatedMappingInProgressMapperNodeState extends MapperNodeState {
	public override makeInstant(
		outputNodes: readonly OutputNode[],
	): InstantMappingSucceededMapperNodeState {
		clearInterval(this.intervalId);
		const newGenerator = this.mapper.map(this.inputImage);
		for (;;) {
			const newGeneratorResult = newGenerator.next();
			if (newGeneratorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputImage(newGeneratorResult.value);
				}
				return new InstantMappingSucceededMapperNodeState(
					this.inputImage,
					this.inputNode,
					this.mapper,
					newGeneratorResult.value,
				);
			}
		}
	}
	public override makeManual(
		stepCount: number,
		outputNodes: readonly OutputNode[],
	): ManualMappingInProgressMapperNodeState {
		clearInterval(this.intervalId);
		return new ManualMappingInProgressMapperNodeState(
			this.generator,
			this.inputImage,
			this.inputNode,
			this.mapper,
			this.outputImage,
			stepCount,
		);
	}
	public override makeAnimated(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
		outputNodes: readonly OutputNode[],
	): AnimatedMappingInProgressMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedMappingInProgressMapperNodeState(
			this.generator,
			this.inputImage,
			this.inputNode,
			newIntervalId,
			newIntervalIntervalSeconds,
			this.mapper,
			this.outputImage,
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
	public constructor(
		generator: Generator<ImageData, ImageData, void>,
		inputImage: ImageData,
		inputNode: Node,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		mapper: Mapper,
		outputImage: ImageData,
	) {
		super("working");
		this.generator = generator;
		this.inputImage = inputImage;
		this.inputNode = inputNode;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
		this.mapper = mapper;
		this.outputImage = outputImage;
	}
	private readonly generator: Generator<ImageData, ImageData, void>;
	private readonly inputImage: ImageData;
	private readonly inputNode: Node;
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public readonly mapper: Mapper;
	public readonly outputImage: ImageData;
	public override setMapper(
		newMapper: Mapper,
		outputNodes: readonly OutputNode[],
	):
		| AnimatedMappingInProgressMapperNodeState
		| AnimatedMappingSucceededMapperNodeState {
		const newGenerator = newMapper.map(this.inputImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputImage(newGeneratorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				this.inputImage,
				this.inputNode,
				this.intervalId,
				this.intervalIntervalSeconds,
				newMapper,
				newGeneratorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				newGenerator,
				this.inputImage,
				this.inputNode,
				this.intervalId,
				this.intervalIntervalSeconds,
				newMapper,
				newGeneratorResult.value,
			);
		}
	}
	public override unsetInputImage(
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputImageMapperNodeState {
		return new AnimatedNoInputImageMapperNodeState(
			this.inputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.mapper,
		);
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
	public override unsetMapper(
		outputNodes: readonly OutputNode[],
	): AnimatedNoMapperMapperNodeState {
		return new AnimatedNoMapperMapperNodeState(
			this.inputImage,
			this.inputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setInputImage(
		newInputImage: ImageData,
		outputNodes: readonly OutputNode[],
	):
		| AnimatedMappingSucceededMapperNodeState
		| AnimatedMappingInProgressMapperNodeState {
		const newGenerator = this.mapper.map(newInputImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputImage(newGeneratorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				newInputImage,
				this.inputNode,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				newGeneratorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				newGenerator,
				newInputImage,
				this.inputNode,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				newGeneratorResult.value,
			);
		}
	}
	public override setInputNodeWithInputImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputImage: ImageData,
		outputNodes: readonly OutputNode[],
	):
		| AnimatedMappingInProgressMapperNodeState
		| AnimatedMappingSucceededMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		const newGenerator = this.mapper.map(newInputImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputImage(newGeneratorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				newInputImage,
				newInputNode,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				newGeneratorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				newGenerator,
				newInputImage,
				newInputNode,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				newGeneratorResult.value,
			);
		}
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
}
