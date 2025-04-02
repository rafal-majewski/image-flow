import type {Edge} from "./Edge.ts";
import type {Mapper} from "./Mapper.ts";
import type {NodeStatus} from "./NodeStatus.ts";
export abstract class MapperNodeState {
	readonly status: NodeStatus;
	protected constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract setMapper(
		mapper: Mapper,
		outputEdges: readonly Edge[],
	): MapperNodeState;
	public abstract unsetInput(outputEdges: readonly Edge[]): MapperNodeState;
	public abstract unsetMapper(outputEdges: readonly Edge[]): MapperNodeState;
	public abstract setInput(
		image: ImageData,
		outputEdges: readonly Edge[],
	): MapperNodeState;
}
