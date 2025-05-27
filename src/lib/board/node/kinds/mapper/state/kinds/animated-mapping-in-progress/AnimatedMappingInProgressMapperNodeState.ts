import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {InstantMappingSucceededMapperNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import {ManualMappingInProgressMapperNodeState} from "../manual-mapping-in-progress/ManualMappingInProgressMapperNodeState.ts";
import {AnimatedMappingSucceededMapperNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededMapperNodeState.ts";
import {AnimatedNoInputEdgeMapperNodeState} from "../animated-no-input-node/AnimatedNoInputEdgeMapperNodeState.ts";
import {AnimatedNoMapperMapperNodeState} from "../animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
import {AnimatedNoInputImageMapperNodeState} from "../animated-no-input-node-image/AnimatedNoInputImageMapperNodeState.ts";
export class AnimatedMappingInProgressMapperNodeState extends MapperNodeState {
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
	public override doAnimatedStep(
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingInProgressMapperNodeState
		| AnimatedMappingSucceededMapperNodeState {
		const generatorResult = this.generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				this.inputEdge,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				this.generator,
				this.inputEdge,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		}
	}
	public override doManualSteps(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	private readonly generator: Generator<ImageData, ImageData, void>;
	private readonly inputEdge: InputEdge;
	private readonly inputNodeImage: ImageData;
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override makeAnimated(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedMappingInProgressMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedMappingInProgressMapperNodeState(
			this.generator,
			this.inputEdge,
			this.inputNodeImage,
			newIntervalId,
			newIntervalIntervalSeconds,
			this.mapper,
			this.outputImage,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
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
					this.inputEdge,
					this.inputNodeImage,
					this.mapper,
					newGeneratorResult.value,
				);
			}
		}
	}
	public override makeManual(
		stepCount: number,
	): ManualMappingInProgressMapperNodeState {
		clearInterval(this.intervalId);
		return new ManualMappingInProgressMapperNodeState(
			this.generator,
			this.inputEdge,
			this.inputNodeImage,
			this.mapper,
			this.outputImage,
			stepCount,
		);
	}
	public readonly mapper: Mapper;
	public readonly outputImage: ImageData;
	public override resetOutputImage(
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingSucceededMapperNodeState
		| AnimatedMappingInProgressMapperNodeState {
		const newGenerator = this.mapper.map(this.inputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new AnimatedMappingSucceededMapperNodeState(
				this.inputEdge,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				newGeneratorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				newGenerator,
				this.inputEdge,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				newGeneratorResult.value,
			);
		}
	}
	public override setInputEdgeWithImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingInProgressMapperNodeState
		| AnimatedMappingSucceededMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
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
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new AnimatedNoInputImageMapperNodeState(
			newInputNode,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.mapper,
		);
	}
	public override setInputNodeImage(
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
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
				this.inputEdge,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				newGeneratorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				newGenerator,
				this.inputEdge,
				newInputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				newGeneratorResult.value,
			);
		}
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedMappingInProgressMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedMappingInProgressMapperNodeState(
			this.generator,
			this.inputEdge,
			this.inputNodeImage,
			newIntervalId,
			newIntervalIntervalSeconds,
			this.mapper,
			this.outputImage,
		);
	}
	public override setMapper(
		newMapper: Mapper,
		outputEdges: readonly OutputEdge[],
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
				this.inputEdge,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				newMapper,
				newGeneratorResult.value,
			);
		} else {
			return new AnimatedMappingInProgressMapperNodeState(
				newGenerator,
				this.inputEdge,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				newMapper,
				newGeneratorResult.value,
			);
		}
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetInputEdge(
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputEdgeMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new AnimatedNoInputEdgeMapperNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
			this.mapper,
		);
	}
	public override unsetInputImage(
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageMapperNodeState {
		return new AnimatedNoInputImageMapperNodeState(
			this.inputEdge,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.mapper,
		);
	}
	public override unsetMapper(
		outputEdges: readonly OutputEdge[],
	): AnimatedNoMapperMapperNodeState {
		return new AnimatedNoMapperMapperNodeState(
			this.inputEdge,
			this.inputNodeImage,
			this.intervalId,
			this.intervalIntervalSeconds,
		);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: MapperNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
