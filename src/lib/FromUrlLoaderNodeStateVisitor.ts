import type {InvalidUrlFromUrlLoaderNodeState} from "./InvalidUrlFromUrlLoaderNodeState.ts";
import type {LoadingInProgressFromUrlLoaderNodeState} from "./LoadingInProgressFromUrlLoaderNodeState.ts";
import type {LoadingSucceededFromUrlLoaderNodeState} from "./LoadingSucceededFromUrlLoaderNodeState.ts";
import type {LoadingFailedFromUrlLoaderNodeState} from "./LoadingFailedFromUrlLoaderNodeState.ts";
import type {NoUrlFromUrlLoaderNodeState} from "./NoUrlFromUrlLoaderNodeState.ts";
export interface FromUrlLoaderNodeStateVisitor<Result> {
	visitInvalidUrl(state: InvalidUrlFromUrlLoaderNodeState): Result;
	visitLoadingInProgress(
		state: LoadingInProgressFromUrlLoaderNodeState,
	): Result;
	visitLoadingSucceeded(state: LoadingSucceededFromUrlLoaderNodeState): Result;
	visitLoadingFailed(state: LoadingFailedFromUrlLoaderNodeState): Result;
	visitNoUrl(state: NoUrlFromUrlLoaderNodeState): Result;
}
