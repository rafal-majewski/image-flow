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
			outputNode.unsetInputImage();
		}
		return new LoadingInProgressFromFileLoaderNodeState(newFile);
	}
	public override connectOutputNode(
		thisNode: FromFileLoaderNode,
		outputNodeToConnect: OutputNode,
	): void {
		outputNodeToConnect.setInputNodeWithInputImage(thisNode, this.image);
	}
}
