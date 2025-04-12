import type {InvalidUrlFromUrlLoaderNode} from "./kinds/invalid-url/InvalidUrlFromUrlLoaderNode.ts";
import type {LoadingFailedFromUrlLoaderNode} from "./kinds/loading-failed/LoadingFailedFromUrlLoaderNode.ts";
import type {LoadingInProgressFromUrlLoaderNode} from "./kinds/loading-in-progress/LoadingInProgressFromUrlLoaderNode.ts";
import type {LoadingSucceededFromUrlLoaderNode} from "./kinds/loading-succeeded/LoadingSucceededFromUrlLoaderNode.ts";
import type {NoUrlFromUrlLoaderNode} from "./kinds/no-url/NoUrlFromUrlLoaderNode.ts";
export type SupportedFromUrlLoaderNode =
	| NoUrlFromUrlLoaderNode
	| InvalidUrlFromUrlLoaderNode
	| LoadingSucceededFromUrlLoaderNode
	| LoadingInProgressFromUrlLoaderNode
	| LoadingFailedFromUrlLoaderNode;
