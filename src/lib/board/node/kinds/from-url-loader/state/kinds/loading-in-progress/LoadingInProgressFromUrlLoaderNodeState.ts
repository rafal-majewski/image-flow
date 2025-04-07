import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {LoadingSucceededFromUrlLoaderNodeState} from "../loading-succeeded/LoadingSucceededFromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "../no-url/NoUrlFromUrlLoaderNodeState.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import {InvalidUrlFromUrlLoaderNodeState} from "../invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
import {LoadingFailedFromUrlLoaderNodeState} from "../loading-failed/LoadingFailedFromUrlLoaderNodeState.ts";
export class LoadingInProgressFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public readonly url: string;
	public constructor(url: string) {
		super("working");
		this.url = url;
	}
	public override load(
		url: string,
		outputEdges: readonly Edge[],
	): LoadingInProgressFromUrlLoaderNodeState {
		return new LoadingInProgressFromUrlLoaderNodeState(url);
	}
	public override setInvalidUrl(
		url: string,
		outputEdges: readonly Edge[],
	): InvalidUrlFromUrlLoaderNodeState {
		return new InvalidUrlFromUrlLoaderNodeState(url);
	}
	public override unsetUrl(
		outputEdges: readonly Edge[],
	): NoUrlFromUrlLoaderNodeState {
		return new NoUrlFromUrlLoaderNodeState();
	}
	public succeedLoading(
		image: ImageData,
		url: string,
		outputEdges: readonly Edge[],
	): LoadingSucceededFromUrlLoaderNodeState {
		for (const edge of outputEdges) {
			edge.targetNode.setInput(image);
		}
		return new LoadingSucceededFromUrlLoaderNodeState(image, url);
	}
	public failLoading(url: string): LoadingFailedFromUrlLoaderNodeState {
		return new LoadingFailedFromUrlLoaderNodeState(url);
	}
	public override handleNewOutputEdge(edge: Edge): void {}
}
