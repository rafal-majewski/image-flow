import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {InvalidUrlFromUrlLoaderNodeState} from "./InvalidUrlFromUrlLoaderNodeState.ts";
import {LoadingSucceededFromUrlLoaderNodeState} from "../loading-succeeded/LoadingSucceededFromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "../no-url/NoUrlFromUrlLoaderNodeState.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
export class LoadingInProgressFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public readonly url: string;
	public constructor(url: string) {
		super("working");
		this.url = url;
	}
	public override loadingInProgress(
		url: string,
	): LoadingInProgressFromUrlLoaderNodeState {
		return new LoadingInProgressFromUrlLoaderNodeState(url);
	}
	public override invalidUrl(url: string): InvalidUrlFromUrlLoaderNodeState {
		return new InvalidUrlFromUrlLoaderNodeState(url);
	}
	public override noUrl(): NoUrlFromUrlLoaderNodeState {
		return new NoUrlFromUrlLoaderNodeState();
	}
	public loadingSucceed(
		image: ImageData,
		url: string,
		outputEdges: readonly Edge[],
	): LoadingSucceededFromUrlLoaderNodeState {
		for (const edge of outputEdges) {
			edge.targetNode.setInput(image);
		}
		return new LoadingSucceededFromUrlLoaderNodeState(image, url);
	}
	public loadingFail(url: string): LoadingInProgressFromUrlLoaderNodeState {
		return new LoadingInProgressFromUrlLoaderNodeState(url);
	}
}
