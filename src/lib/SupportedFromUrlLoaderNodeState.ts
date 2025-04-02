import type {InvalidUrlFromUrlLoaderNodeState} from "./InvalidUrlFromUrlLoaderNodeState";
import type {LoadingFailedFromUrlLoaderNodeState} from "./LoadingFailedFromUrlLoaderNodeState";
import type {LoadingInProgressFromUrlLoaderNodeState} from "./LoadingInProgressFromUrlLoaderNodeState";
import type {LoadingSucceededFromUrlLoaderNodeState} from "./LoadingSucceededFromUrlLoaderNodeState";
import type {NoUrlFromUrlLoaderNodeState} from "./NoUrlFromUrlLoaderNodeState";
export type SupportedFromUrlLoaderNodeState =
	| NoUrlFromUrlLoaderNodeState
	| InvalidUrlFromUrlLoaderNodeState
	| LoadingSucceededFromUrlLoaderNodeState
	| LoadingInProgressFromUrlLoaderNodeState
	| LoadingFailedFromUrlLoaderNodeState;
