import {InvalidUrlFromUrlLoaderNode} from "../invalid-url/InvalidUrlFromUrlLoaderNode.ts";
import {LoadingInProgressFromUrlLoaderNode} from "../loading-in-progress/LoadingInProgressFromUrlLoaderNode.ts";
import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
import type {NodeId} from "../../../../id/NodeId.ts";
import {FromUrlLoaderNode} from "../../FromUrlLoaderNode.ts";
import type {NoInputImageAndNoMapperMapperNode} from "../../../mapper/kinds/no-input-image-and-no-mapper/NoInputImageAndNoMapperMapperNode.ts";
import type {NoInputImageMapperNode} from "../../../mapper/kinds/no-input-image/NoInputImageMapperNode.ts";
export class NoUrlFromUrlLoaderNode extends FromUrlLoaderNode {
	public constructor(
		id: NodeId,
		outputNodes: readonly (
			| NoInputImageMapperNode
			| NoInputImageAndNoMapperMapperNode
		)[],
		position: Coordinates,
	) {
		super(id, position, "unconfigured");
		this.outputNodes = outputNodes;
	}
	public override readonly outputNodes: readonly (
		| NoInputImageMapperNode
		| NoInputImageAndNoMapperMapperNode
	)[];
	public setValidUrl(url: string): LoadingInProgressFromUrlLoaderNode {
		return new LoadingInProgressFromUrlLoaderNode(
			this.id,
			this.outputNodes,
			this.position,
			url,
		);
	}
	public setInvalidUrl(url: string): InvalidUrlFromUrlLoaderNode {
		return new InvalidUrlFromUrlLoaderNode(
			this.id,
			this.outputNodes,
			this.position,
			url,
		);
	}
}
