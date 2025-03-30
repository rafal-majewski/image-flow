import type {Mapper} from "./Mapper.ts";
import type {MapperNode} from "./MapperNode.svelte.ts";
import type {NodeStatus} from "./NodeStatus.ts";
export abstract class MapperNodeState {
	readonly status: NodeStatus;
	protected constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract setMapper(
		mapper: Mapper,
		nextNodes: readonly MapperNode[],
	): MapperNodeState;
	public abstract unsetInput(nextNodes: readonly MapperNode[]): MapperNodeState;
	public abstract unsetMapper(
		nextNodes: readonly MapperNode[],
	): MapperNodeState;
	public abstract setInput(
		image: ImageData,
		nextNodes: readonly MapperNode[],
	): MapperNodeState;
}
