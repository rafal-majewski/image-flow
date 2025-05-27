import type {OutputNode} from "../../../../../OutputNode.ts";
import type {FromUrlLoaderNode} from "../../../FromUrlLoaderNode.svelte.ts";
import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {InvalidUrlFromUrlLoaderNodeState} from "../invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
import {LoadingFailedFromUrlLoaderNodeState} from "../loading-failed/LoadingFailedFromUrlLoaderNodeState.ts";
import {LoadingSucceededFromUrlLoaderNodeState} from "../loading-succeeded/LoadingSucceededFromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "../no-url/NoUrlFromUrlLoaderNodeState.ts";
export class LoadingInProgressFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public constructor(url: string) {
		super("working");
		this.url = url;
	}
	public failLoading(
		outputEdges: readonly OutputEdge[],
	): LoadingFailedFromUrlLoaderNodeState {
		return new LoadingFailedFromUrlLoaderNodeState(this.url);
	}
	public override setInvalidUrl(
		newUrl: string,
		outputEdges: readonly OutputEdge[],
	): InvalidUrlFromUrlLoaderNodeState {
		return new InvalidUrlFromUrlLoaderNodeState(newUrl);
	}
	public override setValidUrl(
		newUrl: string,
		outputEdges: readonly OutputEdge[],
	): LoadingInProgressFromUrlLoaderNodeState {
		return new LoadingInProgressFromUrlLoaderNodeState(newUrl);
	}
	public succeedLoading(
		loadedImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): LoadingSucceededFromUrlLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.setInputNodeImage(loadedImage);
		}
		return new LoadingSucceededFromUrlLoaderNodeState(loadedImage, this.url);
	}
	public unsetUrl(
		outputEdges: readonly OutputEdge[],
	): NoUrlFromUrlLoaderNodeState {
		return new NoUrlFromUrlLoaderNodeState();
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: FromUrlLoaderNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
	public readonly url: string;
}
