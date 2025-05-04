import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualMappingSucceededMapperNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
import {ManualNoInputNodeImageMapperNodeState} from "../manual-no-input-node-image/ManualNoInputNodeImageMapperNodeState.ts";
import {ManualNoInputNodeMapperNodeState} from "../manual-no-input-node/ManualNoInputNodeMapperNodeState.ts";
import {ManualNoMapperMapperNodeState} from "../manual-no-mapper/ManualNoMapperMapperNodeState.ts";
import {InstantMappingSucceededMapperNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import {AnimatedMappingInProgressMapperNodeState} from "../animated-mapping-in-progress/AnimatedMappingInProgressMapperNodeState.ts";
export class ManualMappingInProgressMapperNodeState extends MapperNodeState {
	public override setStepCount(
		newStepCount: number,
	): ManualMappingInProgressMapperNodeState {
		return new ManualMappingInProgressMapperNodeState(
			this.generator,
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
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new ManualMappingSucceededMapperNodeState(
				this.inputNode,
				this.inputNodeImage,
				newMapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
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
	): ManualNoInputNodeImageMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
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
		return new ManualNoInputNodeMapperNodeState(this.mapper, this.stepCount);
	}
	public override unsetInputNodeImage(
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeImageMapperNodeState {
		return new ManualNoInputNodeImageMapperNodeState(
			this.inputNode,
			this.mapper,
			this.stepCount,
		);
	}
	public override unsetMapper(
		outputNodes: readonly OutputNode[],
	): ManualNoMapperMapperNodeState {
		return new ManualNoMapperMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			this.stepCount,
		);
	}
	public override makeInstant(
		outputNodes: readonly OutputNode[],
	): InstantMappingSucceededMapperNodeState {
		for (;;) {
			const generatorResult = this.generator.next();
			if (generatorResult.done) {
				return new InstantMappingSucceededMapperNodeState(
					this.inputNode,
					this.inputNodeImage,
					this.mapper,
					generatorResult.value,
				);
			}
		}
	}
	public override makeManual(
		newStepCount: number,
	): ManualMappingInProgressMapperNodeState {
		return new ManualMappingInProgressMapperNodeState(
			this.generator,
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
	): AnimatedMappingInProgressMapperNodeState {
		return new AnimatedMappingInProgressMapperNodeState(
			this.generator,
			this.inputNode,
			this.inputNodeImage,
			intervalId,
			intervalIntervalSeconds,
			this.mapper,
			this.outputImage,
		);
	}
	public override doManualSteps(
		outputNodes: readonly OutputNode[],
	):
		| ManualMappingInProgressMapperNodeState
		| ManualMappingSucceededMapperNodeState {
		let currentOutputImage = this.outputImage;
		for (
			let stepCountLeft = this.stepCount;
			stepCountLeft > 0;
			stepCountLeft -= 1
		) {
			const generatorResult = this.generator.next();
			if (generatorResult.done) {
				return new ManualMappingSucceededMapperNodeState(
					this.inputNode,
					this.inputNodeImage,
					this.mapper,
					generatorResult.value,
					this.stepCount,
				);
			} else {
				currentOutputImage = generatorResult.value;
			}
		}
		return new ManualMappingInProgressMapperNodeState(
			this.generator,
			this.inputNode,
			this.inputNodeImage,
			this.mapper,
			currentOutputImage,
			this.stepCount,
		);
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
		generator: Generator<ImageData, ImageData, void>,
		inputNode: Node,
		inputNodeImage: ImageData,
		mapper: Mapper,
		outputImage: ImageData,
		stepCount: number,
	) {
		super("working");
		this.generator = generator;
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
		this.mapper = mapper;
		this.outputImage = outputImage;
		this.stepCount = stepCount;
	}
	private readonly generator: Generator<ImageData, ImageData, void>;
	private readonly inputNodeImage: ImageData;
	private readonly inputNode: Node;
	public readonly mapper: Mapper;
	public readonly outputImage: ImageData;
	public readonly stepCount: number;
}
