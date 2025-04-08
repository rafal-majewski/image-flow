import type {Mapper} from "../mapper/Mapper.ts";
import type {NodeStatus} from "../../../status/NodeStatus.ts";
import type {MapperNode} from "../MapperNode.svelte.ts";
export abstract class MapperNodeState {
	readonly status: NodeStatus;
	protected constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract setMapper(
		mapper: Mapper,
		outputNodes: readonly MapperNode[],
	): MapperNodeState;
	public abstract unsetInput(
		outputNodes: readonly MapperNode[],
	): MapperNodeState;
	public abstract unsetMapper(
		outputNodes: readonly MapperNode[],
	): MapperNodeState;
	public abstract setInput(
		image: ImageData,
		outputNodes: readonly MapperNode[],
	): MapperNodeState;
	public abstract handleNewOutputNode(outputNode: MapperNode): void;
}
