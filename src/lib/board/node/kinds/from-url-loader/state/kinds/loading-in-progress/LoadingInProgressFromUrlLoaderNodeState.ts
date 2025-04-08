import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {LoadingSucceededFromUrlLoaderNodeState} from "../loading-succeeded/LoadingSucceededFromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "../no-url/NoUrlFromUrlLoaderNodeState.ts";
import type {MapperNode} from "../../../../mapper/MapperNode.svelte.ts";
import {InvalidUrlFromUrlLoaderNodeState} from "../invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
import {LoadingFailedFromUrlLoaderNodeState} from "../loading-failed/LoadingFailedFromUrlLoaderNodeState.ts";
export class LoadingInProgressFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public readonly url: string;
	public constructor(url: string) {
		super("working");
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
	public succeedLoading(
		image: ImageData,
		url: string,
		outputNodes: readonly MapperNode[],
	): LoadingSucceededFromUrlLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.setInput(image);
		}
		return new LoadingSucceededFromUrlLoaderNodeState(image, url);
	}
	public failLoading(url: string): LoadingFailedFromUrlLoaderNodeState {
		return new LoadingFailedFromUrlLoaderNodeState(url);
	}
	public override handleNewOutputNode(outputNode: MapperNode): void {}
}
