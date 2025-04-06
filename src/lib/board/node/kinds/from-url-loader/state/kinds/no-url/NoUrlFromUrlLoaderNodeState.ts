import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {InvalidUrlFromUrlLoaderNodeState} from "./InvalidUrlFromUrlLoaderNodeState.ts";
import {LoadingInProgressFromUrlLoaderNodeState} from "../loading-in-progress/LoadingInProgressFromUrlLoaderNodeState.ts";
export class NoUrlFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public constructor() {
		super("unconfigured");
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
		return this;
	}
}
