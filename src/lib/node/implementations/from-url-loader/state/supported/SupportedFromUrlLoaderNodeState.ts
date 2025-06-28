import type {LoadingDonedFromUrlLoaderNodeState} from "../implementations/loading-doned/LoadingDonedFromUrlLoaderNodeState.ts";
import type {LoadingStartedFromUrlLoaderNodeState} from "../implementations/loading-started/LoadingStartedFromUrlLoaderNodeState.ts";
import type {NoUrlFromUrlLoaderNodeState} from "../implementations/no-url/NoUrlFromUrlLoaderNodeState.ts";
export type SupportedFromUrlLoaderNodeState =
	| LoadingDonedFromUrlLoaderNodeState
	| LoadingStartedFromUrlLoaderNodeState
	| NoUrlFromUrlLoaderNodeState;
