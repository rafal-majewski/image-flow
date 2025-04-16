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
		thisNode: MapperNode,
		inputNode: InputNode,
		inputImage: ImageData,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract setMapper(
		mapper: Mapper,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract setInputNodeWithoutInputImage(
		thisNode: MapperNode,
		inputNode: InputNode,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract setInputImage(
		inputImage: ImageData,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract unsetInputNode(
		thisNode: MapperNode,
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
	public abstract doManualSteps(
		stepCountLeft: number,
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract doAnimatedStep(
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
	public abstract doInstantSteps(
		outputNodes: readonly OutputNode[],
	): MapperNodeState;
}
