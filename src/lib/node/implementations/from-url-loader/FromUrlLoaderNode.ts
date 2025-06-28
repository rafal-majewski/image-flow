import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import FromUrlLoaderNodeDisplayer from "./displayer/FromUrlLoaderNodeDisplayer.svelte";
import {loadUrl} from "./loading-url/loadUrl.ts";
import type {FromUrlLoaderNodeState} from "./state/FromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "./state/implementations/no-url/NoUrlFromUrlLoaderNodeState.ts";
export class FromUrlLoaderNode extends Node<FromUrlLoaderNodeState> {
	public constructor(position: Coordinates) {
		super(
			FromUrlLoaderNodeDisplayer,
			"From URL loader",
			position,
			new NoUrlFromUrlLoaderNodeState(),
		);
	}
	public async setUrl(url: string): Promise<void> {
		const loadingStartedState = this.state.startLoading(this.outputEdges);
		this.state = loadingStartedState;
		const image = await loadUrl(url);
		if (this.state === loadingStartedState) {
			this.state = loadingStartedState.doneLoading(image, this.outputEdges);
		}
	}
}
