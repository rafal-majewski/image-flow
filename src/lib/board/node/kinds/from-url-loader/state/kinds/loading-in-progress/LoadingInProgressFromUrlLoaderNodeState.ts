import type {OutputNode} from "../../../../../OutputNode.ts";
import type {FromUrlLoaderNode} from "../../../FromUrlLoaderNode.svelte.ts";
import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {InvalidUrlFromUrlLoaderNodeState} from "../invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
import {LoadingFailedFromUrlLoaderNodeState} from "../loading-failed/LoadingFailedFromUrlLoaderNodeState.ts";
import {LoadingSucceededFromUrlLoaderNodeState} from "../loading-succeeded/LoadingSucceededFromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "../no-url/NoUrlFromUrlLoaderNodeState.ts";
export class LoadingInProgressFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public readonly url: string;
	public constructor(url: string) {
		super("working");
		this.url = url;
	}
	public succeedLoading(
		loadedImage: ImageData,
		outputNodes: readonly OutputNode[],
	): LoadingSucceededFromUrlLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.setInputNodeImage(loadedImage);
		}
		return new LoadingSucceededFromUrlLoaderNodeState(loadedImage, this.url);
	}
	public failLoading(
		outputNodes: readonly OutputNode[],
	): LoadingFailedFromUrlLoaderNodeState {
		return new LoadingFailedFromUrlLoaderNodeState(this.url);
	}
	public override setValidUrl(
		newUrl: string,
		outputNodes: readonly OutputNode[],
	): LoadingInProgressFromUrlLoaderNodeState {
		return new LoadingInProgressFromUrlLoaderNodeState(newUrl);
	}
	public override setInvalidUrl(
		newUrl: string,
		outputNodes: readonly OutputNode[],
	): InvalidUrlFromUrlLoaderNodeState {
		return new InvalidUrlFromUrlLoaderNodeState(newUrl);
	}
	public unsetUrl(
		outputNodes: readonly OutputNode[],
	): NoUrlFromUrlLoaderNodeState {
		return new NoUrlFromUrlLoaderNodeState();
	}
	public override updateOutputNodeAfterAdding(
		thisNode: FromUrlLoaderNode,
		outputNodeToUpdate: OutputNode,
	): void {
		outputNodeToUpdate.setInputNodeWithoutImage(thisNode);
	}
}
