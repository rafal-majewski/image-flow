import type {SupportedOutputNode} from "../../../../../SupportedOutputNode.ts";
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
		outputNodes: readonly SupportedOutputNode[],
	): LoadingSucceededFromUrlLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.setInputImage(loadedImage);
		}
		return new LoadingSucceededFromUrlLoaderNodeState(loadedImage, this.url);
	}
	public failLoading(
		outputNodes: readonly SupportedOutputNode[],
	): LoadingFailedFromUrlLoaderNodeState {
		return new LoadingFailedFromUrlLoaderNodeState(this.url);
	}
	public override setValidUrl(
		newUrl: string,
		outputNodes: readonly SupportedOutputNode[],
	): LoadingInProgressFromUrlLoaderNodeState {
		return new LoadingInProgressFromUrlLoaderNodeState(newUrl);
	}
	public override setInvalidUrl(
		newUrl: string,
		outputNodes: readonly SupportedOutputNode[],
	): InvalidUrlFromUrlLoaderNodeState {
		return new InvalidUrlFromUrlLoaderNodeState(newUrl);
	}
	public unsetUrl(
		outputNodes: readonly SupportedOutputNode[],
	): NoUrlFromUrlLoaderNodeState {
		return new NoUrlFromUrlLoaderNodeState();
	}
}
