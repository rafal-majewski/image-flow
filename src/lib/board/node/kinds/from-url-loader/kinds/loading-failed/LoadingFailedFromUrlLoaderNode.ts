import {InvalidUrlFromUrlLoaderNode} from "../invalid-url/InvalidUrlFromUrlLoaderNode.ts";
import {LoadingInProgressFromUrlLoaderNode} from "../loading-in-progress/LoadingInProgressFromUrlLoaderNode.ts";
import {NoUrlFromUrlLoaderNode} from "../no-url/NoUrlFromUrlLoaderNode.ts";
import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
import {FromUrlLoaderNode} from "../../FromUrlLoaderNode.ts";
import type {NoInputImageAndNoMapperMapperNode} from "../../../mapper/kinds/no-input-image-and-no-mapper/NoInputImageAndNoMapperMapperNode.ts";
import type {NoInputImageMapperNode} from "../../../mapper/kinds/no-input-image/NoInputImageMapperNode.ts";
export class LoadingFailedFromUrlLoaderNode extends FromUrlLoaderNode {
	public override outputNodes: readonly (
		| NoInputImageMapperNode
		| NoInputImageAndNoMapperMapperNode
	)[];
	private readonly url: string;
	public constructor(
		id: string,
		oututputNodes: readonly (
			| NoInputImageMapperNode
			| NoInputImageAndNoMapperMapperNode
		)[],
		position: Coordinates,
		url: string,
	) {
		super(id, position, "errored");
		this.outputNodes = oututputNodes;
		this.url = url;
	}
	public setValidUrl(newUrl: string): LoadingInProgressFromUrlLoaderNode {
		return new LoadingInProgressFromUrlLoaderNode(
			this.id,
			this.outputNodes,
			this.position,
			newUrl,
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
