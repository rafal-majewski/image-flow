import type {OutputNode} from "../../../OutputNode.ts";
import type {NodeStatus} from "../../../status/NodeStatus.ts";
import type {Mapper} from "../mapper/Mapper.ts";
import type {MapperNode} from "../MapperNode.svelte.ts";
import type {Node} from "../../../Node.svelte.ts";
export abstract class MapperNodeState {
	public readonly status: NodeStatus;
	public constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract setInputNodeWithImage(
		thisNode: MapperNode,
		inputNode: Node,
		inputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract setMapper(
		mapper: Mapper,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract setInputNodeWithoutImage(
		thisNode: MapperNode,
		inputNode: Node,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract setInputNodeImage(
		inputNodeImage: ImageData,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract unsetInputNode(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract unsetInputNodeImage(
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract unsetMapper(
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract makeInstant(
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract makeManual(
		stepCount: number,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract doStep(outputNodes: readonly OutputNode[]): MapperNodeState;
	public abstract updateOutputNodeAfterAdding(
		thisNode: MapperNode,
		outputNodeToUpdate: OutputNode,
	): void;
}
