import type {OutputNode} from "../../../../../OutputNode.ts";
import type {Mapper} from "../../../mapper/Mapper.ts";
import type {MapperNode} from "../../../MapperNode.svelte.ts";
import {MapperNodeState} from "../../MapperNodeState.ts";
import type {Node} from "../../../../../Node.svelte.ts";
export class ManualNoMapperMapperNodeState extends MapperNodeState {
	public override setInputNodeWithImage(
		thisNode: MapperNode,
		inputNode: Node,
		inputNodeImage: ImageData,
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
	public override setInputNodeWithoutImage(
		thisNode: MapperNode,
		inputNode: Node,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override setInputNodeImage(
		inputNodeImage: ImageData,
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
	public override unsetInputNodeImage(
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
		newStepCount: number,
		outputNodes: readonly OutputNode[],
	): MapperNodeState {
		throw new Error("Method not implemented.");
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
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
		outputNodeToUpdate.setInputNodeWithoutImage(thisNode);
	}
	public constructor(
		inputNode: Node,
		inputNodeImage: ImageData,
		stepCount: number,
	) {
		super("unconfigured");
		this.inputNode = inputNode;
		this.inputNodeImage = inputNodeImage;
		this.stepCount = stepCount;
	}
	private readonly inputNodeImage: ImageData;
	private readonly inputNode: Node;
	public readonly stepCount: number;
}
