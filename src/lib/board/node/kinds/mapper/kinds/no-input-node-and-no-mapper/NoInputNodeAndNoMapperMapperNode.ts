import type {NodeId} from "../../../../id/NodeId.ts";
import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
import type {NoInputImageAndNoMapperMapperNode} from "../no-input-image-and-no-mapper/NoInputImageAndNoMapperMapperNode.ts";
import type {NoInputImageMapperNode} from "../no-input-image/NoInputImageMapperNode.ts";
import type {MappingSucceededMapperNode} from "../mapping-succeeded/MappingSucceededMapperNode.ts";
import type {LoadingSucceededFromUrlLoaderNode} from "../../../from-url-loader/kinds/loading-succeeded/LoadingSucceededFromUrlLoaderNode.ts";
import type {Mapper} from "../../mapper/Mapper.ts";
import {MapperNode} from "../../MapperNode.ts";
import {NoInputNodeMapperNode} from "../no-input-node/NoInputNodeMapperNode.ts";
import {NoMapperMapperNode} from "../no-mapper/NoMapperMapperNode.ts";
export class NoInputNodeAndNoMapperMapperNode extends MapperNode {
	public constructor(
		id: NodeId,
		outputNodes: readonly (
			| NoInputImageAndNoMapperMapperNode
			| NoInputImageMapperNode
		)[],
		position: Coordinates,
	) {
		super(id, position, "unconfigured");
		this.outputNodes = outputNodes;
	}
	public override outputNodes: readonly (
		| NoInputImageAndNoMapperMapperNode
		| NoInputImageMapperNode
	)[];
	public setMapper(mapper: Mapper): NoInputNodeMapperNode {
		return new NoInputNodeMapperNode(
			this.id,
			mapper,
			this.outputNodes,
			this.position,
		);
	}
	public setInputImageAndInputNode(
		inputImage: ImageData,
		inputNode: MappingSucceededMapperNode | LoadingSucceededFromUrlLoaderNode,
	): NoMapperMapperNode {
		return new NoMapperMapperNode(
			this.id,
			inputImage,
			inputNode,
			this.outputNodes,
			this.position,
		);
	}
}
