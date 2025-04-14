import type {OutputNode} from "../../../../../OutputNode.ts";
import type {SupportedOutputNode} from "../../../../../SupportedOutputNode.ts";
import type {FromFileLoaderNode} from "../../../FromFileLoaderNode.svelte.ts";
import {FromFileLoaderNodeState} from "../../FromFileLoaderNodeState.ts";
import {LoadingSucceededFromFileLoaderNodeState} from "../loading-succeeded/LoadingSucceededFromFileLoaderNodeState.ts";
export class LoadingInProgressFromFileLoaderNodeState extends FromFileLoaderNodeState {
	public readonly file: File;
	public constructor(file: File) {
		super("working");
		this.file = file;
	}
	public succeedLoading(
		loadedImage: ImageData,
		outputNodes: readonly OutputNode[],
	): LoadingSucceededFromFileLoaderNodeState {
		for (const outputNode of outputNodes) {
			outputNode.setInputImage(loadedImage);
		}
		return new LoadingSucceededFromFileLoaderNodeState(this.file, loadedImage);
	}
	public override setFile(
		newFile: File,
		outputNodes: readonly OutputNode[],
	): LoadingInProgressFromFileLoaderNodeState {
		return new LoadingInProgressFromFileLoaderNodeState(newFile);
	}
	public override connectOutputNode(
		thisNode: FromFileLoaderNode,
		outputNodeToConnect: OutputNode,
	): void {
		outputNodeToConnect.setInputNodeWithoutInputImage(thisNode);
	}
}
