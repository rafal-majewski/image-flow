import type {Edge} from "../../../../edge/Edge.ts";
import type {Mapper} from "../mapper/Mapper.ts";
import type {NodeStatus} from "../../../status/NodeStatus.ts";
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
