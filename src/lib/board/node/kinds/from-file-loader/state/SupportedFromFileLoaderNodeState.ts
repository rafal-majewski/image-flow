import type {LoadingInProgressFromFileLoaderNodeState} from "./kinds/loading-in-progress/LoadingInProgressFromFileLoaderNodeState.ts";
import type {LoadingSucceededFromFileLoaderNodeState} from "./kinds/loading-succeeded/LoadingSucceededFromFileLoaderNodeState.ts";
import type {NoFileFromFileLoaderNodeState} from "./kinds/no-file/NoFileFromFileLoaderNodeState.ts";
export type SupportedFromFileLoaderNodeState =
	| LoadingInProgressFromFileLoaderNodeState
	| LoadingSucceededFromFileLoaderNodeState
	| NoFileFromFileLoaderNodeState;
