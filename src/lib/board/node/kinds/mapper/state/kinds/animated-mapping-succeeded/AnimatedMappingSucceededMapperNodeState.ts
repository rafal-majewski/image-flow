import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {AnimatedMappingInProgressMapperNodeState} from "../animated-mapping-in-progress/AnimatedMappingInProgressMapperNodeState.ts";
import {AnimatedNoInputNodeMapperNodeState} from "../animated-no-input-node/AnimatedNoInputNodeMapperNodeState.ts";
import {AnimatedNoMapperMapperNodeState} from "../animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
import {InstantMappingSucceededMapperNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import {ManualMappingSucceededMapperNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
import {AnimatedNoInputNodeImageMapperNodeState} from "../animated-no-input-node-image/AnimatedNoInputNodeImageMapperNodeState.ts";
export class AnimatedMappingSucceededMapperNodeState extends MapperNodeState {
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedMappingSucceededMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedMappingSucceededMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			newIntervalId,
			newIntervalIntervalSeconds,
			this.mapper,
			this.outputImage,
		);
	}
	public override setInputNodeWithImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	):
		| AnimatedMappingSucceededMapperNodeState
		| AnimatedMappingInProgressMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
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
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
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
	public override setMapper(
		newMapper: Mapper,
		outputNodes: readonly OutputNode[],
	):
		| AnimatedMappingSucceededMapperNodeState
		| AnimatedMappingInProgressMapperNodeState {
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
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
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
	public override setInputNodeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeImageMapperNodeState {
		return new AnimatedNoInputNodeImageMapperNodeState(
			this.inputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.mapper,
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
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
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
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new AnimatedNoInputNodeMapperNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
			this.mapper,
		);
	}
	public override unsetInputNodeImage(
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeImageMapperNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new AnimatedNoInputNodeImageMapperNodeState(
			this.inputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.mapper,
		);
	}
	public override unsetMapper(
		outputNodes: readonly OutputNode[],
	): AnimatedNoMapperMapperNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new AnimatedNoMapperMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override makeInstant(
		outputNodes: readonly OutputNode[],
	): InstantMappingSucceededMapperNodeState {
		clearInterval(this.intervalId);
		return new InstantMappingSucceededMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			this.mapper,
			this.outputImage,
		);
	}
	public override makeManual(
		stepCount: number,
	): ManualMappingSucceededMapperNodeState {
		clearInterval(this.intervalId);
		return new ManualMappingSucceededMapperNodeState(
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
	): AnimatedMappingSucceededMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedMappingSucceededMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			newIntervalId,
			newIntervalIntervalSeconds,
			this.mapper,
			this.outputImage,
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
		outputNodeToUpdate.setInputNodeWithImage(thisNode, this.outputImage);
	}
	public constructor(
		inputNode: Node,
		inputNodeImage: ImageData,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		mapper: Mapper,
		outputImage: ImageData,
	) {
		super("done");
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
		this.mapper = mapper;
		this.outputImage = outputImage;
	}
	private readonly inputNodeImage: ImageData;
	private readonly inputNode: Node;
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public readonly mapper: Mapper;
	public readonly outputImage: ImageData;
	public override resetOutputImage(
		outputNodes: readonly OutputNode[],
	):
		| AnimatedMappingSucceededMapperNodeState
		| AnimatedMappingInProgressMapperNodeState {
		const generator = this.mapper.map(this.inputNodeImage);
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
				this.mapper,
				generatorResult.value,
			);
		} else {
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
			return new AnimatedMappingInProgressMapperNodeState(
				generator,
				this.inputNode,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		}
	}
}
