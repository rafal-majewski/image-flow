import {LoadingInProgressFromUrlLoaderNodeState} from "./LoadingInProgressFromUrlLoaderNodeState.ts";
import {FromUrlLoaderNodeState} from "./FromUrlLoaderNodeState.ts";
import {InvalidUrlFromUrlLoaderNodeState} from "./InvalidUrlFromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "./NoUrlFromUrlLoaderNodeState.ts";
import type {FromUrlLoaderNodeStateVisitor} from "./FromUrlLoaderNodeStateVisitor.ts";
export class LoadingSucceededFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public readonly image: ImageData;
	public readonly url: string;
	public constructor(image: ImageData, url: string) {
		super("done");
		this.image = image;
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
	public override acceptVisitor<Result>(
		visitor: FromUrlLoaderNodeStateVisitor<Result>,
	): Result {
		return visitor.visitLoadingSucceed(this);
	}
}
