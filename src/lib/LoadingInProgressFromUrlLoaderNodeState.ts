import {FromUrlLoaderNodeState} from "./FromUrlLoaderNodeState.ts";
import {InvalidUrlFromUrlLoaderNodeState} from "./InvalidUrlFromUrlLoaderNodeState.ts";
import {LoadingSucceededFromUrlLoaderNodeState} from "./LoadingSucceededFromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "./NoUrlFromUrlLoaderNodeState.ts";
import type {FromUrlLoaderNodeStateVisitor} from "./FromUrlLoaderNodeStateVisitor.ts";
import type {Edge} from "./Edge.ts";
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
	public loadingSucceeded(
		image: ImageData,
		url: string,
		outputEdges: readonly Edge[],
	): LoadingSucceededFromUrlLoaderNodeState {
		for (const edge of outputEdges) {
			edge.targetNode.setInput(image);
		}
		return new LoadingSucceededFromUrlLoaderNodeState(image, url);
	}
	public loadingFailed(url: string): LoadingInProgressFromUrlLoaderNodeState {
		return new LoadingInProgressFromUrlLoaderNodeState(url);
	}
	public override acceptVisitor<Result>(
		visitor: FromUrlLoaderNodeStateVisitor<Result>,
	): Result {
		return visitor.visitLoadingInProgress(this);
	}
}
