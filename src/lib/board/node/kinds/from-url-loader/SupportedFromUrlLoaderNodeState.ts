import type {InvalidUrlFromUrlLoaderNodeState} from "./InvalidUrlFromUrlLoaderNodeState.ts";
import type {LoadingFailedFromUrlLoaderNodeState} from "./state/kinds/loading-failed/LoadingFailedFromUrlLoaderNodeState.ts";
import type {LoadingInProgressFromUrlLoaderNodeState} from "./state/kinds/loading-in-progress/LoadingInProgressFromUrlLoaderNodeState.ts";
import type {LoadingSucceededFromUrlLoaderNodeState} from "./state/kinds/loading-succeeded/LoadingSucceededFromUrlLoaderNodeState.ts";
import type {NoUrlFromUrlLoaderNodeState} from "./state/kinds/no-url/NoUrlFromUrlLoaderNodeState.ts";
export type SupportedFromUrlLoaderNodeState =
	| NoUrlFromUrlLoaderNodeState
	| InvalidUrlFromUrlLoaderNodeState
	| LoadingSucceededFromUrlLoaderNodeState
	| LoadingInProgressFromUrlLoaderNodeState
	| LoadingFailedFromUrlLoaderNodeState;
