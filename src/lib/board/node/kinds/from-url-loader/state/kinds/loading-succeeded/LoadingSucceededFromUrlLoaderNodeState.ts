import type {SupportedOutputNode} from "../../../../../SupportedOutputNode.ts";
import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {InvalidUrlFromUrlLoaderNodeState} from "../invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
import {LoadingInProgressFromUrlLoaderNodeState} from "../loading-in-progress/LoadingInProgressFromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "../no-url/NoUrlFromUrlLoaderNodeState.ts";
export class LoadingSucceededFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public readonly image: ImageData;
	public readonly url: string;
	public constructor(image: ImageData, url: string) {
		super("done");
		this.image = image;
		this.url = url;
	}
	public override setValidUrl(
		newUrl: string,
		outputNodes: readonly SupportedOutputNode[],
	): LoadingInProgressFromUrlLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputImage();
		}
		return new LoadingInProgressFromUrlLoaderNodeState(newUrl);
	}
	public override setInvalidUrl(
		newUrl: string,
		outputNodes: readonly SupportedOutputNode[],
	): InvalidUrlFromUrlLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputImage();
		}
		return new InvalidUrlFromUrlLoaderNodeState(newUrl);
	}
	public unsetUrl(
		outputNodes: readonly SupportedOutputNode[],
	): NoUrlFromUrlLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputImage();
		}
		return new NoUrlFromUrlLoaderNodeState();
	}
}
