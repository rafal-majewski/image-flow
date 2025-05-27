import type {OutputNode} from "../../../../../OutputNode.ts";
import type {FromFileLoaderNode} from "../../../FromFileLoaderNode.svelte.ts";
import {FromFileLoaderNodeState} from "../../FromFileLoaderNodeState.ts";
import {LoadingInProgressFromFileLoaderNodeState} from "../loading-in-progress/LoadingInProgressFromFileLoaderNodeState.ts";
export class NoFileFromFileLoaderNodeState extends FromFileLoaderNodeState {
	public constructor() {
		super("unconfigured");
	}
	public override setFile(
		file: File,
		outputEdges: readonly OutputEdge[],
	): LoadingInProgressFromFileLoaderNodeState {
		return new LoadingInProgressFromFileLoaderNodeState(file);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: FromFileLoaderNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
