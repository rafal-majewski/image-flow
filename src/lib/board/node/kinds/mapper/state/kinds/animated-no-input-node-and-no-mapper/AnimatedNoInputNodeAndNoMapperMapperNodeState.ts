import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Node} from "../../../../../Node.svelte.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import {AnimatedNoInputImageAndNoMapperMapperNodeState} from "../animated-no-input-image-and-no-mapper/AnimatedNoInputImageAndNoMapperMapperNodeState.ts";
import {InstantNoInputNodeAndNoMapperMapperNodeState} from "../instant-no-input-node-and-no-mapper/InstantNoInputNodeAndNoMapperMapperNodeState.ts";
import {AnimatedNoInputNodeMapperNodeState} from "../animated-no-input-node/AnimatedNoInputNodeMapperNodeState.ts";
import {AnimatedNoMapperMapperNodeState} from "../animated-no-mapper/AnimatedNoMapperMapperNodeState.ts";
export class AnimatedNoInputNodeAndNoMapperMapperNodeState extends MapperNodeState {
	public override setInputNodeWithInputImage(
		thisNode: MapperNode,
		inputNode: Node,
		inputImage: ImageData,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override setMapper(
		mapper: Mapper,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override setInputNodeWithoutInputImage(
		thisNode: MapperNode,
		inputNode: Node,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override setInputImage(
		inputImage: ImageData,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override unsetInputImage(
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override unsetMapper(
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override makeInstant(
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override makeManual(
		stepCount: number,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override makeAnimated(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override doStep(outputNodes: readonly OutputNode[]): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override updateOutputNodeAfterAdding(
		thisNode: MapperNode,
		outputNodeToUpdate: OutputNode,
	): void {
		throw new Error("Method not implemented.");
	}
	public constructor(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	) {
		super("unconfigured");
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
	}
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
}
