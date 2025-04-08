import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {InvalidUrlFromUrlLoaderNodeState} from "../invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
import {LoadingInProgressFromUrlLoaderNodeState} from "../loading-in-progress/LoadingInProgressFromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "../no-url/NoUrlFromUrlLoaderNodeState.ts";
import type {MapperNode} from "../../../../mapper/MapperNode.svelte.ts";
export class LoadingSucceededFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public readonly image: ImageData;
	public readonly url: string;
	public constructor(image: ImageData, url: string) {
		super("done");
		this.image = image;
		this.url = url;
	}
	public override load(
		url: string,
		outputNodes: readonly MapperNode[],
	): LoadingInProgressFromUrlLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInput();
		}
		return new LoadingInProgressFromUrlLoaderNodeState(url);
	}
	public override setInvalidUrl(
		url: string,
		outputNodes: readonly MapperNode[],
	): InvalidUrlFromUrlLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInput();
		}
		return new InvalidUrlFromUrlLoaderNodeState(url);
	}
	public override unsetUrl(
		outputNodes: readonly MapperNode[],
	): NoUrlFromUrlLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInput();
		}
		return new NoUrlFromUrlLoaderNodeState();
	}
	public override handleNewOutputNode(outputNode: MapperNode): void {
		outputNode.setInput(this.image);
	}
}
