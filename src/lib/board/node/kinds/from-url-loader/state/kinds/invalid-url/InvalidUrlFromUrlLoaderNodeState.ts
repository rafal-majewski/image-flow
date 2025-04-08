import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {LoadingInProgressFromUrlLoaderNodeState} from "../loading-in-progress/LoadingInProgressFromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "../no-url/NoUrlFromUrlLoaderNodeState.ts";
import type {MapperNode} from "../../../../mapper/MapperNode.svelte.ts";
export class InvalidUrlFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public readonly url: string;
	public constructor(url: string) {
		super("errored");
		this.url = url;
	}
	public override load(
		url: string,
		outputNodes: readonly MapperNode[],
	): LoadingInProgressFromUrlLoaderNodeState {
		return new LoadingInProgressFromUrlLoaderNodeState(url);
	}
	public override setInvalidUrl(
		url: string,
		outputNodes: readonly MapperNode[],
	): InvalidUrlFromUrlLoaderNodeState {
		return new InvalidUrlFromUrlLoaderNodeState(url);
	}
	public override unsetUrl(
		outputNodes: readonly MapperNode[],
	): NoUrlFromUrlLoaderNodeState {
		return new NoUrlFromUrlLoaderNodeState();
	}
	public override handleNewOutputNode(outputNode: MapperNode): void {}
}
