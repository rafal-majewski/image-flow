import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {InitialNode} from "../../initial/InitialNode.ts";
import FromUrlLoaderNodeDisplayer from "./displayer/FromUrlLoaderNodeDisplayer.svelte";
import {loadUrl} from "./loading-url/loadUrl.ts";
import type {FromUrlLoaderNodeState} from "./state/FromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "./state/implementations/no-url/NoUrlFromUrlLoaderNodeState.ts";
export class FromUrlLoaderNode implements InitialNode {
	public constructor(position: Coordinates) {
		this.displayer = FromUrlLoaderNodeDisplayer;
		this.position = position;
		this.name = "From URL loader";
		this.state = new NoUrlFromUrlLoaderNodeState();
	}
	public readonly displayer: typeof FromUrlLoaderNodeDisplayer;
	public readonly name: string;
	public position: Coordinates;
	public async setUrl(url: string): Promise<void> {
		const loadingStartedState = this.state.startLoading(this.outputEdges);
		this.state = loadingStartedState;
		const image = await loadUrl(url);
		if (this.state === loadingStartedState) {
			this.state = loadingStartedState.doneLoading(image, this.outputEdges);
		}
	}
	/**
	 * Do not reassign externally.
	 */
	public state: FromUrlLoaderNodeState;
}
