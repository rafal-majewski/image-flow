import type {NodeStatus} from "../../../status/NodeStatus.ts";
import type {SupportedOutputNode} from "../../../SupportedOutputNode.ts";
export abstract class FromUrlLoaderNodeState {
	public readonly status: NodeStatus;
	public constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract setValidUrl(
		url: string,
		outputNodes: readonly SupportedOutputNode[],
	): FromUrlLoaderNodeState;
	public abstract setInvalidUrl(
		url: string,
		outputNodes: readonly SupportedOutputNode[],
	): FromUrlLoaderNodeState;
}
