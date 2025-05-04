import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {AnimatedMappingSucceededMapperNodeState} from "../animated-mapping-succeeded/AnimatedMappingSucceededMapperNodeState.ts";
import {InstantNoInputNodeMapperNodeState} from "../instant-no-input-node/InstantNoInputNodeMapperNodeState.ts";
import {InstantNoMapperMapperNodeState} from "../instant-no-mapper/InstantNoMapperMapperNodeState.ts";
import {ManualMappingSucceededMapperNodeState} from "../manual-mapping-succeeded/ManualMappingSucceededMapperNodeState.ts";
import {InstantNoInputNodeImageMapperNodeState} from "../instant-no-input-node-image/InstantNoInputNodeImageMapperNodeState.ts";
export class InstantMappingSucceededMapperNodeState extends MapperNodeState {
	public override setStepCount(stepCount: number): this {
		return this;
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
	): InstantMappingSucceededMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
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
	public override setMapper(
		newMapper: Mapper,
		outputNodes: readonly OutputNode[],
	): InstantMappingSucceededMapperNodeState {
		const generator = newMapper.map(this.inputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededMapperNodeState(
					this.inputNode,
					this.inputNodeImage,
					newMapper,
					generatorResult.value,
				);
			}
		}
	}
	public override setInputNodeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeImageMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new InstantNoInputNodeImageMapperNodeState(
			newInputNode,
			this.mapper,
		);
	}
	public override setInputNodeImage(
		newInputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): InstantMappingSucceededMapperNodeState {
		const generator = this.mapper.map(newInputNodeImage);
		for (;;) {
			const generatorResult = generator.next();
			if (generatorResult.done) {
				for (const outputNode of outputNodes) {
					outputNode.setInputNodeImage(generatorResult.value);
				}
				return new InstantMappingSucceededMapperNodeState(
					this.inputNode,
					newInputNodeImage,
					this.mapper,
					generatorResult.value,
				);
			}
		}
	}
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new InstantNoInputNodeMapperNodeState(this.mapper);
	}
	public override unsetInputNodeImage(
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeImageMapperNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new InstantNoInputNodeImageMapperNodeState(
			this.inputNode,
			this.mapper,
		);
	}
	public override unsetMapper(
		outputNodes: readonly OutputNode[],
	): InstantNoMapperMapperNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new InstantNoMapperMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
		);
	}
	public override makeInstant(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualMappingSucceededMapperNodeState {
		return new ManualMappingSucceededMapperNodeState(
			this.inputNode,
			this.inputNodeImage,
			this.mapper,
			this.outputImage,
			stepCount,
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
		outputNodeToUpdate.setInputNodeWithImage(thisNode, this.inputNodeImage);
	}
	public readonly mapper: Mapper;
	private readonly inputNodeImage: ImageData;
	private readonly inputNode: Node;
	public readonly outputImage: ImageData;
	public constructor(
		inputNode: Node,
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
}
