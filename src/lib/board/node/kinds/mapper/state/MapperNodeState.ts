import type {NodeStatus} from "../../../status/NodeStatus.ts";
import type {Mapper} from "../mapper/Mapper.ts";
import type {OutputEdge} from "../../../../edge/types/output/OutputEdge.ts";
import {NodeState} from "../../../state/NodeState.ts";
export abstract class MapperNodeState extends NodeState {
	public constructor(status: NodeStatus) {
		super(status);
	}
	public abstract setMapper(
		mapper: Mapper,
		outputEdges: readonly OutputEdge[],
	): MapperNodeState;
	public abstract unsetInputEdge(
		outputEdges: readonly OutputEdge[],
	): MapperNodeState;
	public abstract unsetInputImage(
		outputEdges: readonly OutputEdge[],
	): MapperNodeState;
	public abstract unsetMapper(
		outputEdges: readonly OutputEdge[],
	): MapperNodeState;
}
