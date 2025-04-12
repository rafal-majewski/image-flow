import {InvalidUrlFromUrlLoaderNode} from "../invalid-url/InvalidUrlFromUrlLoaderNode.ts";
import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
import type {NodeId} from "../../../../id/NodeId.ts";
import {FromUrlLoaderNode} from "../../FromUrlLoaderNode.ts";
import {LoadingSucceededFromUrlLoaderNode} from "../loading-succeeded/LoadingSucceededFromUrlLoaderNode.ts";
import {NoUrlFromUrlLoaderNode} from "../no-url/NoUrlFromUrlLoaderNode.ts";
import type {NoInputImageAndNoMapperMapperNode} from "../../../mapper/kinds/no-input-image-and-no-mapper/NoInputImageAndNoMapperMapperNode.ts";
import type {NoInputImageMapperNode} from "../../../mapper/kinds/no-input-image/NoInputImageMapperNode.ts";
export class LoadingInProgressFromUrlLoaderNode extends FromUrlLoaderNode {
	public override outputNodes: readonly (
		| NoInputImageMapperNode
		| NoInputImageAndNoMapperMapperNode
	)[];
	public readonly url: string;
	public constructor(
		id: NodeId,
		oututputNodes: readonly (
			| NoInputImageMapperNode
			| NoInputImageAndNoMapperMapperNode
		)[],
		position: Coordinates,
		url: string,
	) {
		super(id, position, "working");
		this.outputNodes = oututputNodes;
		this.url = url;
	}
	public load(image: ImageData): LoadingSucceededFromUrlLoaderNode {
		const newOutputNodes = this.outputNodes.map((outputNode) =>
			outputNode.setInputImage(image),
		);
		return new LoadingSucceededFromUrlLoaderNode(
			this.id,
			image,
			newOutputNodes,
			this.position,
			this.url,
		);
	}
	public setInvalidUrl(newUrl: string): InvalidUrlFromUrlLoaderNode {
		return new InvalidUrlFromUrlLoaderNode(
			this.id,
			this.outputNodes,
			this.position,
			newUrl,
		);
	}
	public unsetUrl(): NoUrlFromUrlLoaderNode {
		return new NoUrlFromUrlLoaderNode(this.id, this.outputNodes, this.position);
	}
}
