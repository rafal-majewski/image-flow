import type {InvalidUrlFromUrlLoaderNodeState} from "./kinds/invalid-url/InvalidUrlFromUrlLoaderNodeState.ts";
import type {LoadingFailedFromUrlLoaderNodeState} from "./kinds/loading-failed/LoadingFailedFromUrlLoaderNodeState.ts";
import type {LoadingInProgressFromUrlLoaderNodeState} from "./kinds/loading-in-progress/LoadingInProgressFromUrlLoaderNodeState.ts";
import type {LoadingSucceededFromUrlLoaderNodeState} from "./kinds/loading-succeeded/LoadingSucceededFromUrlLoaderNodeState.ts";
import type {NoUrlFromUrlLoaderNodeState} from "./kinds/no-url/NoUrlFromUrlLoaderNodeState.ts";
export type SupportedFromUrlLoaderNodeState =
	| InvalidUrlFromUrlLoaderNodeState
	| LoadingFailedFromUrlLoaderNodeState
	| LoadingInProgressFromUrlLoaderNodeState
	| LoadingSucceededFromUrlLoaderNodeState
	| NoUrlFromUrlLoaderNodeState;
