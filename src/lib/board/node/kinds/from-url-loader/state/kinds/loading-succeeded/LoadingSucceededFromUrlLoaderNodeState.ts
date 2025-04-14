import type {OutputNode} from "../../../../../OutputNode.ts";
import type {FromUrlLoaderNode} from "../../../FromUrlLoaderNode.svelte.ts";
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
		outputNodes: readonly OutputNode[],
	): LoadingInProgressFromUrlLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputImage();
		}
		return new LoadingInProgressFromUrlLoaderNodeState(newUrl);
	}
	public override setInvalidUrl(
		newUrl: string,
		outputNodes: readonly OutputNode[],
	): InvalidUrlFromUrlLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputImage();
		}
		return new InvalidUrlFromUrlLoaderNodeState(newUrl);
	}
	public unsetUrl(
		outputNodes: readonly OutputNode[],
	): NoUrlFromUrlLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputImage();
		}
		return new NoUrlFromUrlLoaderNodeState();
	}
	public override connectOutputNode(
		thisNode: FromUrlLoaderNode,
		outputNodeToConnect: OutputNode,
	): void {
		outputNodeToConnect.setInputNodeWithInputImage(thisNode, this.image);
	}
}
