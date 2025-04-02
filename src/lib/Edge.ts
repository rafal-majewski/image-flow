import type {FromUrlLoaderNode} from "./FromUrlLoaderNode.svelte";
import type {MapperNode} from "./MapperNode.svelte";
export class Edge {
	public readonly sourceNode: MapperNode | FromUrlLoaderNode;
	public readonly targetNode: MapperNode;
	public constructor(
		sourceNode: MapperNode | FromUrlLoaderNode,
		targetNode: MapperNode,
	) {
		this.sourceNode = sourceNode;
		this.targetNode = targetNode;
	}
}
