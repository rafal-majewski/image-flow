import type {OutputNode} from "../../../../../OutputNode.ts";
import type {FromFileLoaderNode} from "../../../FromFileLoaderNode.svelte.ts";
import {FromFileLoaderNodeState} from "../../FromFileLoaderNodeState.ts";
import {LoadingInProgressFromFileLoaderNodeState} from "../loading-in-progress/LoadingInProgressFromFileLoaderNodeState.ts";
export class LoadingSucceededFromFileLoaderNodeState extends FromFileLoaderNodeState {
	public constructor(file: File, image: ImageData) {
		super("done");
		this.file = file;
		this.image = image;
	}
	public readonly file: File;
	public readonly image: ImageData;
	public override setFile(
		newFile: File,
		outputEdges: readonly OutputEdge[],
	): LoadingInProgressFromFileLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new LoadingInProgressFromFileLoaderNodeState(newFile);
	}
	public override updateOutputEdgeAfterAdding(
		thisNode: FromFileLoaderNode,
		outputEdgeToUpdate: OutputEdge,
	): void {
		outputNodeToUpdate.setInputEdgeWithImage(thisNode, this.image);
	}
}
