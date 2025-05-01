import type {OutputNode} from "../../../../../OutputNode.ts";
import type {FromFileLoaderNode} from "../../../FromFileLoaderNode.svelte.ts";
import {FromFileLoaderNodeState} from "../../FromFileLoaderNodeState.ts";
import {LoadingInProgressFromFileLoaderNodeState} from "../loading-in-progress/LoadingInProgressFromFileLoaderNodeState.ts";
export class LoadingSucceededFromFileLoaderNodeState extends FromFileLoaderNodeState {
	public readonly file: File;
	public readonly image: ImageData;
	public constructor(file: File, image: ImageData) {
		super("done");
		this.file = file;
		this.image = image;
	}
	public override setFile(
		newFile: File,
		outputNodes: readonly OutputNode[],
	): LoadingInProgressFromFileLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.unsetInputNodeImage();
		}
		return new LoadingInProgressFromFileLoaderNodeState(newFile);
	}
	public override updateOutputNodeAfterAdding(
		thisNode: FromFileLoaderNode,
		outputNodeToUpdate: OutputNode,
	): void {
		outputNodeToUpdate.setInputNodeWithImage(thisNode, this.image);
	}
}
