import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualMappingSucceededMapperNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
import {ManualNoMapperMapperNodeState} from "../manual-no-mapper/ManualNoMapperMapperNodeState.ts";
import {InstantMappingSucceededMapperNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import {AnimatedMappingInProgressMapperNodeState} from "../animated-mapping-in-progress/AnimatedMappingInProgressMapperNodeState.ts";
import type {InputEdge} from "../../../../../../edge/types/input/InputEdge.ts";
import type {OutputEdge} from "../../../../../../edge/types/output/OutputEdge.ts";
export class ManualMappingInProgressMapperNodeState extends MapperNodeState {
	public constructor(
		generator: Generator<ImageData, ImageData, void>,
		inputEdge: InputEdge,
		inputEdgeImage: ImageData,
		mapper: Mapper,
		outputImage: ImageData,
		stepCount: number,
	) {
		super("working");
		this.generator = generator;
		this.inputEdge = inputEdge;
		this.inputEdgeImage = inputEdgeImage;
		this.mapper = mapper;
		this.outputImage = outputImage;
		this.stepCount = stepCount;
	}
	public override doAnimatedStep(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override doManualSteps(
		outputEdges: readonly OutputEdge[],
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
					this.inputEdge,
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
			this.inputEdge,
			this.inputNodeImage,
			this.mapper,
			currentOutputImage,
			this.stepCount,
		);
	}
	private readonly generator: Generator<ImageData, ImageData, void>;
	private readonly inputEdge: InputEdge;
	private readonly inputEdgeImage: ImageData;
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedMappingInProgressMapperNodeState {
		return new AnimatedMappingInProgressMapperNodeState(
			this.generator,
			this.inputEdge,
			this.inputNodeImage,
			intervalId,
			intervalIntervalSeconds,
			this.mapper,
			this.outputImage,
		);
	}
	public override makeInstant(
		outputEdges: readonly OutputEdge[],
	): InstantMappingSucceededMapperNodeState {
		for (;;) {
			const generatorResult = this.generator.next();
			if (generatorResult.done) {
				return new InstantMappingSucceededMapperNodeState(
					this.inputEdge,
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
			this.inputEdge,
			this.inputNodeImage,
			this.mapper,
			this.outputImage,
			newStepCount,
		);
	}
	public readonly mapper: Mapper;
	public readonly outputImage: ImageData;
	public override resetOutputImage(
		outputEdges: readonly OutputEdge[],
	):
		| ManualMappingSucceededMapperNodeState
		| ManualMappingInProgressMapperNodeState {
		const newGenerator = this.mapper.map(this.inputNodeImage);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(newGeneratorResult.value);
			}
			return new ManualMappingSucceededMapperNodeState(
				this.inputEdge,
				this.inputNodeImage,
				this.mapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualMappingInProgressMapperNodeState(
				newGenerator,
				this.inputEdge,
				this.inputNodeImage,
				this.mapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		}
	}
	public override setInputEdgeWithImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	):
		| ManualMappingInProgressMapperNodeState
		| ManualMappingSucceededMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
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
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new ManualNoInputImageMapperNodeState(
			newInputNode,
			this.mapper,
			this.stepCount,
		);
	}
	public override setInputNodeImage(
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
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
				this.inputEdge,
				newInputNodeImage,
				this.mapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualMappingInProgressMapperNodeState(
				newGenerator,
				this.inputEdge,
				newInputNodeImage,
				this.mapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		}
	}
	public override setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override setMapper(
		newMapper: Mapper,
		outputEdges: readonly OutputEdge[],
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
				this.inputEdge,
				this.inputNodeImage,
				newMapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualMappingInProgressMapperNodeState(
				newGenerator,
				this.inputEdge,
				this.inputNodeImage,
				newMapper,
				newGeneratorResult.value,
				this.stepCount,
			);
		}
	}
	public override setStepCount(
		newStepCount: number,
	): ManualMappingInProgressMapperNodeState {
		return new ManualMappingInProgressMapperNodeState(
			this.generator,
			this.inputEdge,
			this.inputNodeImage,
			this.mapper,
			this.outputImage,
			newStepCount,
		);
	}
	public readonly stepCount: number;
	public override unsetInputEdge(
		outputEdges: readonly OutputEdge[],
	): ManualNoInputEdgeMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		return new ManualNoInputEdgeMapperNodeState(this.mapper, this.stepCount);
	}
	public override unsetInputImage(
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageMapperNodeState {
		return new ManualNoInputImageMapperNodeState(
			this.inputEdge,
			this.mapper,
			this.stepCount,
		);
	}
	public override unsetMapper(
		outputEdges: readonly OutputEdge[],
	): ManualNoMapperMapperNodeState {
		return new ManualNoMapperMapperNodeState(
			this.inputEdge,
			this.inputNodeImage,
			this.stepCount,
		);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: MapperNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
