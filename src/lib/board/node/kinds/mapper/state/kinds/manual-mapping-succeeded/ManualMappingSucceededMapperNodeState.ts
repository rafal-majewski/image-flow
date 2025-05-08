import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualMappingInProgressMapperNodeState} from "../manual-mapping-in-progress/ManualMappingInProgressMapperNodeState.ts";
import {ManualNoInputNodeImageMapperNodeState} from "../manual-no-input-node-image/ManualNoInputNodeImageMapperNodeState.ts";
import {ManualNoInputNodeMapperNodeState} from "../manual-no-input-node/ManualNoInputNodeMapperNodeState.ts";
import {ManualNoMapperMapperNodeState} from "../manual-no-mapper/ManualNoMapperMapperNodeState.ts";
import {InstantMappingSucceededMapperNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import {AnimatedMappingSucceededMapperNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededMapperNodeState.ts";
export class ManualMappingSucceededMapperNodeState extends MapperNodeState {
	public override setStepCount(
		newStepCount: number,
	): ManualMappingSucceededMapperNodeState {
		return new ManualMappingSucceededMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			this.mapper,
			this.outputImage,
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
		const newGenerator = this.mapper.map(newInputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new ManualMappingSucceededMapperNodeState(
				newInputNode,
				newInputNodeImage,
				this.mapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
			return new ManualMappingInProgressMapperNodeState(
				newGenerator,
				newInputNode,
				newInputNodeImage,
				this.mapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		}
	}
	public override setMapper(
		newMapper: Mapper,
		outputNodes: readonly OutputNode[],
	):
		| ManualMappingInProgressMapperNodeState
		| ManualMappingSucceededMapperNodeState {
		const newGenerator = newMapper.map(this.inputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			return new ManualMappingSucceededMapperNodeState(
				this.inputNode,
				this.inputNodeImage,
				newMapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
			return new ManualMappingInProgressMapperNodeState(
				newGenerator,
				this.inputNode,
				this.inputNodeImage,
				newMapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		}
	}
	public override setInputNodeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new ManualNoInputNodeImageMapperNodeState(
			newInputNode,
			this.mapper,
			this.stepCount,
		);
	}
	public override setInputNodeImage(
		newInputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	):
		| ManualMappingInProgressMapperNodeState
		| ManualMappingSucceededMapperNodeState {
		const newGenerator = this.mapper.map(newInputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new ManualMappingSucceededMapperNodeState(
				this.inputNode,
				newInputNodeImage,
				this.mapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
			return new ManualMappingInProgressMapperNodeState(
				newGenerator,
				this.inputNode,
				newInputNodeImage,
				this.mapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		}
	}
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new ManualNoInputNodeMapperNodeState(this.mapper, this.stepCount);
	}
	public override unsetInputNodeImage(
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeImageMapperNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new ManualNoInputNodeImageMapperNodeState(
			this.inputNode,
			this.mapper,
			this.stepCount,
		);
	}
	public override unsetMapper(
		outputNodes: readonly OutputNode[],
	): ManualNoMapperMapperNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new ManualNoMapperMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			this.stepCount,
		);
	}
	public override makeInstant(
		outputNodes: readonly OutputNode[],
	): InstantMappingSucceededMapperNodeState {
		return new InstantMappingSucceededMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			this.mapper,
			this.outputImage,
		);
	}
	public override makeManual(
		newStepCount: number,
	): ManualMappingSucceededMapperNodeState {
		return new ManualMappingSucceededMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			this.mapper,
			this.outputImage,
			newStepCount,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedMappingSucceededMapperNodeState {
		return new AnimatedMappingSucceededMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			intervalId,
			intervalIntervalSeconds,
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
		outputNodeToUpdate.setInputNodeWithImage(
			this.inputNode,
			this.inputNodeImage,
		);
	}
	public constructor(
		inputNode: Node,
		inputNodeImage: ImageData,
		mapper: Mapper,
		outputImage: ImageData,
		stepCount: number,
	) {
		super("done");
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
		this.mapper = mapper;
		this.outputImage = outputImage;
		this.stepCount = stepCount;
	}
	private readonly inputNodeImage: ImageData;
	private readonly inputNode: Node;
	public readonly mapper: Mapper;
	public readonly outputImage: ImageData;
	public readonly stepCount: number;
	public override resetOutputImage(
		outputNodes: readonly OutputNode[],
	):
		| ManualMappingSucceededMapperNodeState
		| ManualMappingInProgressMapperNodeState {
		const generator = this.mapper.map(this.inputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new ManualMappingSucceededMapperNodeState(
				this.inputNode,
				this.inputNodeImage,
				this.mapper,
				generatorResult.value,
				this.stepCount,
			);
		} else {
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
			return new ManualMappingInProgressMapperNodeState(
				generator,
				this.inputNode,
				this.inputNodeImage,
				this.mapper,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
}
