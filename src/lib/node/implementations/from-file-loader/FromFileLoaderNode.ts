import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import FromFileLoaderNodeDisplayer from "./displayer/FromFileLoaderNodeDisplayer.svelte";
import {loadFile} from "./loading-file/loadFile.ts";
import type {FromFileLoaderNodeState} from "./state/FromFileLoaderNodeState.ts";
import {NoFileFromFileLoaderNodeState} from "./state/implementations/no-file/NoFileFromFileLoaderNodeState.ts";
export class FromFileLoaderNode extends Node<FromFileLoaderNodeState> {
	public constructor(position: Coordinates) {
		super(
			FromFileLoaderNodeDisplayer,
			"From file loader",
			position,
			new NoFileFromFileLoaderNodeState(),
		);
	}
	public async setFile(file: File): Promise<void> {
		const loadingStartedState = this.state.startLoading(this.outputEdges);
		this.state = loadingStartedState;
		const image = await loadFile(file);
		if (this.state === loadingStartedState) {
			this.state = loadingStartedState.doneLoading(image, this.outputEdges);
		}
	}
}
