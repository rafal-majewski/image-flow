import {LoadingInProgressFromUrlLoaderNodeState} from "./LoadingInProgressFromUrlLoaderNodeState.ts";
import {FromUrlLoaderNodeState} from "./FromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "./NoUrlFromUrlLoaderNodeState.ts";
export class InvalidUrlFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public readonly url: string;
	public constructor(url: string) {
		super("errored");
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
}
