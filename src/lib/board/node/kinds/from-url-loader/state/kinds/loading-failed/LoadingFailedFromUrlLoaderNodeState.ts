import type {OutputNode} from "../../../../../OutputNode.ts";
import type {FromUrlLoaderNode} from "../../../FromUrlLoaderNode.svelte.ts";
import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {InvalidUrlFromUrlLoaderNodeState} from "../invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
import {LoadingInProgressFromUrlLoaderNodeState} from "../loading-in-progress/LoadingInProgressFromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "../no-url/NoUrlFromUrlLoaderNodeState.ts";
export class LoadingFailedFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public constructor(url: string) {
		super("errored");
		this.url = url;
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
