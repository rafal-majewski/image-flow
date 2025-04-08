import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {InvalidUrlFromUrlLoaderNodeState} from "../invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
import {LoadingInProgressFromUrlLoaderNodeState} from "../loading-in-progress/LoadingInProgressFromUrlLoaderNodeState.ts";
import type {MapperNode} from "../../../../mapper/MapperNode.svelte.ts";
export class NoUrlFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public constructor() {
		super("unconfigured");
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
		return this;
	}
	public override handleNewOutputNode(outputNode: MapperNode): void {}
}
