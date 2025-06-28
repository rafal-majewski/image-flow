import type {LoadingDoneFromUrlLoaderNodeState} from "../implementations/loading-doned/LoadingDoneFromUrlLoaderNodeState.ts";
import type {LoadingStartedFromUrlLoaderNodeState} from "../implementations/loading-started/LoadingStartedFromUrlLoaderNodeState.ts";
import type {NoUrlFromUrlLoaderNodeState} from "../implementations/no-url/NoUrlFromUrlLoaderNodeState.ts";
export type SupportedFromUrlLoaderNodeState =
	| LoadingDoneFromUrlLoaderNodeState
	| LoadingStartedFromUrlLoaderNodeState
	| NoUrlFromUrlLoaderNodeState;
