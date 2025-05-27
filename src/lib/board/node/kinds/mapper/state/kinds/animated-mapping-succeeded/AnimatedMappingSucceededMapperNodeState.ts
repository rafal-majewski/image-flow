import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import {AnimatedMappingInProgressMapperNodeState} from "../animated-mapping-in-progress/AnimatedMappingInProgressMapperNodeState.ts";
import {AnimatedNoInputEdgeMapperNodeState} from "../animated-no-input-node/AnimatedNoInputEdgeMapperNodeState.ts";
import {AnimatedNoMapperMapperNodeState} from "../animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
import {InstantMappingSucceededMapperNodeState} from "../instant-mapping-succeeded/InstantMappingSucceededMapperNodeState.ts";
import {ManualMappingSucceededMapperNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
import {AnimatedNoInputImageMapperNodeState} from "../animated-no-input-node-image/AnimatedNoInputImageMapperNodeState.ts";
export class AnimatedMappingSucceededMapperNodeState extends MapperNodeState {
	public constructor(
		inputEdge: InputEdge,
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
	public override doAnimatedStep(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override doManualSteps(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	private readonly inputEdge: InputEdge;
	private readonly inputNodeImage: ImageData;
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override makeAnimated(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedMappingSucceededMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedMappingSucceededMapperNodeState(
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
		return new InstantMappingSucceededMapperNodeState(
			this.inputEdge,
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
		const generator = this.mapper.map(this.inputNodeImage);
		const generatorResult = generator.next();
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
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
			return new AnimatedMappingInProgressMapperNodeState(
				generator,
				this.inputEdge,
				this.inputNodeImage,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.mapper,
				generatorResult.value,
			);
		}
	}
	public override setInputEdgeWithImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	):
		| AnimatedMappingSucceededMapperNodeState
		| AnimatedMappingInProgressMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
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
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
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
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageMapperNodeState {
		return new AnimatedNoInputImageMapperNodeState(
			this.inputEdge,
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
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
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
	): AnimatedMappingSucceededMapperNodeState {
		clearInterval(this.intervalId);
		return new AnimatedMappingSucceededMapperNodeState(
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
		| AnimatedMappingSucceededMapperNodeState
		| AnimatedMappingInProgressMapperNodeState {
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
			for (const outputNode of outputNodes) {
				outputNode.unsetInputNodeImage();
			}
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
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new AnimatedNoInputEdgeMapperNodeState(
			this.intervalId,
			this.intervalIntervalSeconds,
			this.mapper,
		);
	}
	public override unsetInputImage(
		outputEdges: readonly OutputEdge[],
	): AnimatedNoInputImageMapperNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
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
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
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
		outputNodeToUpdate.setInputEdgeWithImage(thisNode, this.outputImage);
	}
}
