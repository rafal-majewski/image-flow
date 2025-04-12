import type {Mapper} from "../../mapper/Mapper.ts";
import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
import type {NodeId} from "../../../../id/NodeId.ts";
import type {LoadingSucceededFromUrlLoaderNode} from "../../../from-url-loader/kinds/loading-succeeded/LoadingSucceededFromUrlLoaderNode.ts";
import type {MappingSucceededMapperNode} from "../mapping-succeeded/MappingSucceededMapperNode.ts";
import {NoInputImageMapperNode} from "../no-input-image/NoInputImageMapperNode.ts";
import {MapperNode} from "../../MapperNode.ts";
import {NoMapperMapperNode} from "../no-mapper/NoMapperMapperNode.ts";
export class NoInputImageAndNoMapperMapperNode extends MapperNode {
	public constructor(
		id: NodeId,
		inputNode: MappingSucceededMapperNode | LoadingSucceededFromUrlLoaderNode,
		outputNodes: readonly (
			| NoInputImageAndNoMapperMapperNode
			| NoInputImageMapperNode
			| NoMapperMapperNode
		)[],
		position: Coordinates,
	) {
		super(id, position, "unconfigured");
		this.inputNode = inputNode;
		this.outputNodes = outputNodes;
	}
	public readonly inputNode:
		| MappingSucceededMapperNode
		| LoadingSucceededFromUrlLoaderNode;
	public override outputNodes: readonly (
		| NoInputImageAndNoMapperMapperNode
		| NoInputImageMapperNode
		| NoMapperMapperNode
	)[];
	public setMapper(mapper: Mapper): NoInputImageMapperNode {
		return new NoInputImageMapperNode(
			this.id,
			this.inputNode,
			mapper,
			this.outputNodes,
			this.position,
		);
	}
	public setInputImage(inputImage: ImageData): NoMapperMapperNode {
		return new NoMapperMapperNode(
			this.id,
			inputImage,
			this.inputNode,
			this.outputNodes,
			this.position,
		);
	}
}
