import type {OutputNode} from "../../../../../OutputNode.ts";
import type {FromUrlLoaderNode} from "../../../FromUrlLoaderNode.svelte.ts";
import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {InvalidUrlFromUrlLoaderNodeState} from "../invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
import {LoadingInProgressFromUrlLoaderNodeState} from "../loading-in-progress/LoadingInProgressFromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "../no-url/NoUrlFromUrlLoaderNodeState.ts";
export class LoadingSucceededFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public constructor(image: ImageData, url: string) {
		super("done");
		this.image = image;
		this.url = url;
	}
	public readonly image: ImageData;
	public override setInvalidUrl(
		newUrl: string,
		outputEdges: readonly OutputEdge[],
	): InvalidUrlFromUrlLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new InvalidUrlFromUrlLoaderNodeState(newUrl);
	}
	public override setValidUrl(
		newUrl: string,
		outputEdges: readonly OutputEdge[],
	): LoadingInProgressFromUrlLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new LoadingInProgressFromUrlLoaderNodeState(newUrl);
	}
	public unsetUrl(
		outputEdges: readonly OutputEdge[],
	): NoUrlFromUrlLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new NoUrlFromUrlLoaderNodeState();
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: FromUrlLoaderNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputNodeToUpdate.setInputEdgeWithImage(thisNode, this.image);
	}
	public readonly url: string;
}
