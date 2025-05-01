import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {InstantNoMapperMapperNodeState} from "../instant-no-mapper/InstantNoMapperMapperNodeState.ts";
import {InstantNoInputNodeImageMapperNodeState} from "../instant-no-input-node-image/InstantNoInputNodeImageMapperNodeState.ts";
import {ManualNoInputNodeImageAndNoMapperMapperNodeState} from "../manual-no-input-node-image-and-no-mapper/ManualNoInputNodeImageAndNoMapperMapperNodeState.ts";
import {AnimatedNoInputNodeImageAndNoMapperMapperNodeState} from "../animated-no-input-node-image-and-no-mapper/AnimatedNoInputNodeImageAndNoMapperMapperNodeState.ts";
export class InstantNoInputNodeImageAndNoMapperMapperNodeState extends MapperNodeState {
	public override setInputNodeWithImage(
		thisNode: MapperNode,
		newInputNode: Node,
		newInputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): InstantNoMapperMapperNodeState {
		return new InstantNoMapperMapperNodeState(newInputNode, newInputNodeImage);
	}
	public override setMapper(
		mapper: Mapper,
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeImageMapperNodeState {
		return new InstantNoInputNodeImageMapperNodeState(this.inputNode, mapper);
	}
	public override setInputNodeWithoutImage(
		thisNode: MapperNode,
		newInputNode: Node,
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeImageAndNoMapperMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new InstantNoInputNodeImageAndNoMapperMapperNodeState(newInputNode);
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): InstantNoMapperMapperNodeState {
		return new InstantNoMapperMapperNodeState(this.inputNode, inputNodeImage);
	}
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): InstantNoInputNodeImageAndNoMapperMapperNodeState {
		this.inputNode.deleteOutputNode(thisNode);
		return new InstantNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
		);
	}
	public override unsetInputNodeImage(
		outputNodes: readonly OutputNode[],
	): this {
		return this;
	}
	public override unsetMapper(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override makeInstant(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
		outputNodes: readonly OutputNode[],
	): ManualNoInputNodeImageAndNoMapperMapperNodeState {
		return new ManualNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
			stepCount,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		outputNodes: readonly OutputNode[],
	): AnimatedNoInputNodeImageAndNoMapperMapperNodeState {
		return new AnimatedNoInputNodeImageAndNoMapperMapperNodeState(
			this.inputNode,
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public override doStep(outputNodes: readonly OutputNode[]): this {
		return this;
	}
	public override updateOutputNodeAfterAdding(
		thisNode: MapperNode,
		outputNodeToUpdate: OutputNode,
	): void {
		outputNodeToUpdate.setInputNodeWithoutImage(thisNode);
	}
	public constructor(inputNode: Node) {
		super("unconfigured");
		this.inputNode = inputNode;
	}
	private readonly inputNode: Node;
}
