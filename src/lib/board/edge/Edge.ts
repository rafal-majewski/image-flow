import type {FromUrlLoaderNode} from "../node/kinds/from-url-loader/FromUrlLoaderNode.ts";
import type {MapperNode} from "../node/kinds/mapper/MapperNode.ts";
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
