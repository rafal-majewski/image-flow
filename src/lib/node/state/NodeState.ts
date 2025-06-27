import type {HandledEdgeBuilder} from "../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {NodeStateStatus} from "./status/NodeStateStatus.ts";
export abstract class NodeState {
	protected constructor(status: NodeStateStatus) {
		this.status = status;
	}
	readonly status: NodeStateStatus;
	abstract useEdgeBuilder(builder: HandledEdgeBuilder): void;
}
