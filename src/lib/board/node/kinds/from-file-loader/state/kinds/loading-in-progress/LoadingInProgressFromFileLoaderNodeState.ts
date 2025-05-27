import type {OutputNode} from "../../../../../OutputNode.ts";
import type {FromFileLoaderNode} from "../../../FromFileLoaderNode.svelte.ts";
import {FromFileLoaderNodeState} from "../../FromFileLoaderNodeState.ts";
import {LoadingSucceededFromFileLoaderNodeState} from "../loading-succeeded/LoadingSucceededFromFileLoaderNodeState.ts";
export class LoadingInProgressFromFileLoaderNodeState extends FromFileLoaderNodeState {
	public constructor(file: File) {
		super("working");
		this.file = file;
	}
	public readonly file: File;
	public override setFile(
		newFile: File,
		outputEdges: readonly OutputEdge[],
	): LoadingInProgressFromFileLoaderNodeState {
		return new LoadingInProgressFromFileLoaderNodeState(newFile);
	}
	public succeedLoading(
		loadedImage: ImageData,
		outputEdges: readonly OutputEdge[],
	): LoadingSucceededFromFileLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.setInputNodeImage(loadedImage);
		}
		return new LoadingSucceededFromFileLoaderNodeState(this.file, loadedImage);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: FromFileLoaderNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputEdgeToUpdate.setInputEdgeWithoutImage(thisNode);
	}
}
