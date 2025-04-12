import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
import type {NodeId} from "../../../../id/NodeId.ts";
import type {MappingInProgressMapperNode} from "../../../mapper/kinds/mapping-in-progress/MappingInProgressMapperNode.ts";
import type {MappingSucceededMapperNode} from "../../../mapper/kinds/mapping-succeeded/MappingSucceededMapperNode.ts";
import type {NoMapperMapperNode} from "../../../mapper/kinds/no-mapper/NoMapperMapperNode.ts";
import {FromUrlLoaderNode} from "../../FromUrlLoaderNode.ts";
import {InvalidUrlFromUrlLoaderNode} from "../invalid-url/InvalidUrlFromUrlLoaderNode.ts";
import {LoadingInProgressFromUrlLoaderNode} from "../loading-in-progress/LoadingInProgressFromUrlLoaderNode.ts";
import {NoUrlFromUrlLoaderNode} from "../no-url/NoUrlFromUrlLoaderNode.ts";
export class LoadingSucceededFromUrlLoaderNode extends FromUrlLoaderNode {
	public readonly image: ImageData;
	public override outputNodes: readonly (
		| MappingInProgressMapperNode
		| MappingSucceededMapperNode
		| NoMapperMapperNode
	)[];
	public readonly url: string;
	public constructor(
		id: NodeId,
		image: ImageData,
		outputNodes: readonly (
			| MappingInProgressMapperNode
			| MappingSucceededMapperNode
			| NoMapperMapperNode
		)[],
		position: Coordinates,
		url: string,
	) {
		super(id, position, "done");
		this.image = image;
		this.outputNodes = outputNodes;
		this.url = url;
	}
	public setValidUrl(newUrl: string): LoadingInProgressFromUrlLoaderNode {
		const newOutputNodes = this.outputNodes.map((outputNode) =>
			outputNode.unsetInputImage(),
		);
		return new LoadingInProgressFromUrlLoaderNode(
			this.id,
			newOutputNodes,
			this.position,
			newUrl,
		);
	}
	public setInvalidUrl(newUrl: string): InvalidUrlFromUrlLoaderNode {
		const newOutputNodes = this.outputNodes.map((outputNode) =>
			outputNode.unsetInputImage(),
		);
		return new InvalidUrlFromUrlLoaderNode(
			this.id,
			newOutputNodes,
			this.position,
			newUrl,
		);
	}
	public unsetUrl(): NoUrlFromUrlLoaderNode {
		const newOutputNodes = this.outputNodes.map((outputNode) =>
			outputNode.unsetInputImage(),
		);
		return new NoUrlFromUrlLoaderNode(this.id, newOutputNodes, this.position);
	}
}
