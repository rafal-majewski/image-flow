import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {AnimatedMappingSucceededMapperNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededMapperNodeState.ts";
import {InstantNoInputEdgeMapperNodeState} from "../instant-no-input-node/InstantNoInputEdgeMapperNodeState.ts";
import {InstantNoMapperMapperNodeState} from "../instant-no-mapper/InstantNoMapperMapperNodeState.ts";
import {ManualMappingSucceededMapperNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
import {InstantNoInputImageMapperNodeState} from "../instant-no-input-node-image/InstantNoInputImageMapperNodeState.ts";
export class InstantMappingSucceededMapperNodeState extends MapperNodeState {
	public constructor(
		inputEdge: InputEdge,
		inputNodeImage: ImageData,
		mapper: Mapper,
		outputImage: ImageData,
	) {
		super("done");
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
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
	public override makeInstant(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualMappingSucceededMapperNodeState {
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
	public override resetOutputImage(outputEdges: readonly OutputEdge[]): this {
		return this;
	}
	public override setInputEdgeWithImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): InstantMappingSucceededMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		const generator = this.mapper.map(newInputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededMapperNodeState(
					newInputNode,
					newInputNodeImage,
					this.mapper,
					generatorResult.value,
				);
			}
		}
	}
	public override setInputEdgeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new InstantNoInputImageMapperNodeState(newInputNode, this.mapper);
	}
	public override setInputNodeImage(
		newInputNodeImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): InstantMappingSucceededMapperNodeState {
		const generator = this.mapper.map(newInputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededMapperNodeState(
					this.inputEdge,
					newInputNodeImage,
					this.mapper,
					generatorResult.value,
				);
			}
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
	): InstantMappingSucceededMapperNodeState {
		const generator = newMapper.map(this.inputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededMapperNodeState(
					this.inputEdge,
					this.inputNodeImage,
					newMapper,
					generatorResult.value,
				);
			}
		}
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetInputEdge(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputEdgeMapperNodeState {
		this.inputEdge.disconnectFromInputNode();
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new InstantNoInputEdgeMapperNodeState(this.mapper);
	}
	public override unsetInputImage(
		outputEdges: readonly OutputEdge[],
	): InstantNoInputImageMapperNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new InstantNoInputImageMapperNodeState(this.inputEdge, this.mapper);
	}
	public override unsetMapper(
		outputEdges: readonly OutputEdge[],
	): InstantNoMapperMapperNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new InstantNoMapperMapperNodeState(
			this.inputEdge,
			this.inputNodeImage,
		);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: MapperNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputNodeToUpdate.setInputEdgeWithImage(thisNode, this.inputNodeImage);
	}
}
