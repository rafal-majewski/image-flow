import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {ManualMappingInProgressMapperNodeState} from "../manual-mapping-in-progress/ManualMappingInProgressMapperNodeState.ts";
import {ManualNoInputImageMapperNodeState} from "../manual-no-input-node-image/ManualNoInputImageMapperNodeState.ts";
import {ManualNoInputEdgeMapperNodeState} from "../manual-no-input-node/ManualNoInputEdgeMapperNodeState.ts";
import {ManualNoMapperMapperNodeState} from "../manual-no-mapper/ManualNoMapperMapperNodeState.ts";
import {InstantMappingSucceededMapperNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import {AnimatedMappingSucceededMapperNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededMapperNodeState.ts";
export class ManualMappingSucceededMapperNodeState extends MapperNodeState {
	public constructor(
		inputEdge: InputEdge,
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
	public override doAnimatedStep(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override doManualSteps(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	private readonly inputEdge: InputEdge;
	private readonly inputNodeImage: ImageData;
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedMappingSucceededMapperNodeState {
		return new AnimatedMappingSucceededMapperNodeState(
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
		return new InstantMappingSucceededMapperNodeState(
			this.inputEdge,
			this.inputNodeImage,
			this.mapper,
			this.outputImage,
		);
	}
	public override makeManual(
		newStepCount: number,
	): ManualMappingSucceededMapperNodeState {
		return new ManualMappingSucceededMapperNodeState(
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
		const generator = this.mapper.map(this.inputNodeImage);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			for (const outputNode of outputNodes) {
				outputNode.setInputNodeImage(generatorResult.value);
			}
			return new ManualMappingSucceededMapperNodeState(
				this.inputEdge,
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
				this.inputEdge,
				this.inputNodeImage,
				this.mapper,
				generatorResult.value,
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
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): MapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
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
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
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
			return new ManualMappingSucceededMapperNodeState(
				this.inputEdge,
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
	): ManualMappingSucceededMapperNodeState {
		return new ManualMappingSucceededMapperNodeState(
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
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new ManualNoInputEdgeMapperNodeState(this.mapper, this.stepCount);
	}
	public override unsetInputImage(
		outputEdges: readonly OutputEdge[],
	): ManualNoInputImageMapperNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new ManualNoInputImageMapperNodeState(
			this.inputEdge,
			this.mapper,
			this.stepCount,
		);
	}
	public override unsetMapper(
		outputEdges: readonly OutputEdge[],
	): ManualNoMapperMapperNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
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
		outputNodeToUpdate.setInputEdgeWithImage(
			this.inputEdge,
			this.inputNodeImage,
		);
	}
}
