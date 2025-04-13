import type {NodeStatus} from "../../../status/NodeStatus.ts";
import type {SupportedInputNode} from "../../../SupportedInputNode.ts";
import type {SupportedOutputNode} from "../../../SupportedOutputNode.ts";
import type {Mapper} from "../mapper/Mapper.ts";
export abstract class MapperNodeState {
	public readonly status: NodeStatus;
	public constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract setInputNodeWithInputImage(
		inputImage: ImageData,
		inputNode: SupportedInputNode,
		outputNodes: readonly SupportedOutputNode[],
	): MapperNodeState;
	public abstract setMapper(
		mapper: Mapper,
		outputNodes: readonly SupportedOutputNode[],
	): MapperNodeState;
	public abstract setInputNodeWithoutInputImage(
		inputNode: SupportedInputNode,
		outputNodes: readonly SupportedOutputNode[],
	): MapperNodeState;
}
