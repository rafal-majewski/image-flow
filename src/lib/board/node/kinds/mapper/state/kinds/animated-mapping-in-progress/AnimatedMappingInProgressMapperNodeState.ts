import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {InstantMappingSucceededMapperNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import {ManualMappingInProgressMapperNodeState} from "../manual-mapping-in-progress/ManualMappingInProgressMapperNodeState.ts";
import {AnimatedMappingSucceededMapperNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededMapperNodeState.ts";
import {AnimatedNoInputNodeMapperNodeState} from "../animated-no-input-node/AnimatedNoInputNodeMapperNodeState.ts";
import {AnimatedNoMapperMapperNodeState} from "../animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
import {AnimatedNoInputNodeImageMapperNodeState} from "../animated-no-input-node-image/AnimatedNoInputNodeImageMapperNodeState.ts";
export class AnimatedMappingInProgressMapperNodeState extends MapperNodeState {
	public override makeInstant(
		outputNodes: readonly OutputNode[],
	): InstantMappingSucceededMapperNodeState {
		clearInterval(this.intervalId);
		const newGenerator = this.mapper.map(this.inputNodeImage);
		for (;;) {
			const newGeneratorResult = newGenerator.next();
			if (newGeneratorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(newGeneratorResult.value);
				}
				return new InstantMappingSucceededMapperNodeState(
					this.inputNode,
					this.inputNodeImage,
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
			this.inputNode,
			this.inputNodeImage,
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
			this.inputNode,
			this.inputNodeImage,
			newIntervalId,
			newIntervalIntervalSeconds,
			this.mapper,
			this.outputImage,
		);
	}
	public override doStep(
		outputNodes: readonly OutputNode[],
	):
		| AnimatedMappingInProgressMapperNodeState
		| AnimatedMappingSucceededMapperNodeState {
		const generatorResult = this.generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				this.inputNode,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				this.generator,
				this.inputNode,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		}
	}
	public override updateOutputNodeAfterAdding(
		thisNode: MapperNode,
		outputNodeToUpdate: OutputNode,
	): void {
		outputNodeToUpdate.setInputNodeWithoutImage(thisNode);
	}
	public constructor(
		generator: Generator<ImageData, ImageData, void>,
		inputNode: Node,
		inputNodeImage: ImageData,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		mapper: Mapper,
		outputImage: ImageData,
	) {
		super("working");
		this.generator = generator;
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
		this.mapper = mapper;
		this.outputImage = outputImage;
	}
	private readonly generator: Generator<ImageData, ImageData, void>;
	private readonly inputNodeImage: ImageData;
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
		const newGenerator = newMapper.map(this.inputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				this.inputNode,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				newMapper,
				newGeneratorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				newGenerator,
				this.inputNode,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				newMapper,
				newGeneratorResult.value,
			);
		}
	}
	public override unsetInputNodeImage(
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeImageMapperNodeState {
		return new AnimatedNoInputNodeImageMapperNodeState(
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
			this.inputNode,
			this.inputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override setInputNodeImage(
		newInputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	):
		| AnimatedMappingSucceededMapperNodeState
		| AnimatedMappingInProgressMapperNodeState {
		const newGenerator = this.mapper.map(newInputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				this.inputNode,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				newGeneratorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				newGenerator,
				this.inputNode,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				newGeneratorResult.value,
			);
		}
	}
	public override setInputNodeWithImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	):
		| AnimatedMappingInProgressMapperNodeState
		| AnimatedMappingSucceededMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		const newGenerator = this.mapper.map(newInputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				newInputNode,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				newGeneratorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				newGenerator,
				newInputNode,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				newGeneratorResult.value,
			);
		}
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
}
