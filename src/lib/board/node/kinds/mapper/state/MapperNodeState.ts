import type {InputNode} from "../../../InputNode.ts";
import type {OutputNode} from "../../../OutputNode.ts";
import type {NodeStatus} from "../../../status/NodeStatus.ts";
import type {Mapper} from "../mapper/Mapper.ts";
import type {MapperNode} from "../MapperNode.svelte.ts";
export abstract class MapperNodeState {
	public readonly status: NodeStatus;
	public constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract setInputNodeWithInputImage(
		inputNode: InputNode,
		inputImage: ImageData,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract setMapper(
		mapper: Mapper,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract setInputNodeWithoutInputImage(
		inputNode: InputNode,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract disconnect(
		thisNode: MapperNode,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract setInputImage(
		inputImage: ImageData,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract unsetInputNode(
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract unsetInputImage(
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract unsetMapper(
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract connectOutputNode(
		thisNode: MapperNode,
		outputNodeToAdd: OutputNode,
	): void;
}
