import type {OutputNode} from "../../../../../OutputNode.ts";
import type {FromUrlLoaderNode} from "../../../FromUrlLoaderNode.svelte.ts";
import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {InvalidUrlFromUrlLoaderNodeState} from "../invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
import {LoadingInProgressFromUrlLoaderNodeState} from "../loading-in-progress/LoadingInProgressFromUrlLoaderNodeState.ts";
export class NoUrlFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public constructor() {
		super("unconfigured");
	}
	public override setInvalidUrl(
		url: string,
		outputEdges: readonly OutputEdge[],
	): InvalidUrlFromUrlLoaderNodeState {
		return new InvalidUrlFromUrlLoaderNodeState(url);
	}
	public override setValidUrl(
		url: string,
		outputEdges: readonly OutputEdge[],
	): LoadingInProgressFromUrlLoaderNodeState {
		return new LoadingInProgressFromUrlLoaderNodeState(url);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: FromUrlLoaderNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
