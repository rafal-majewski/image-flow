import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import FromUrlLoaderNodeDisplayer from "./displayer/FromUrlLoaderNodeDisplayer.svelte";
import {loadImageFromUrl} from "./loading-image-from-url/loadImageFromUrl.ts";
import {NoUrlFromUrlLoaderNodeState} from "./state/implementations/no-url/NoUrlFromUrlLoaderNodeState.ts";
import type {SupportedFromUrlLoaderNodeState} from "./state/supported/SupportedFromUrlLoaderNodeState.ts";
export class FromUrlLoaderNode extends Node<SupportedFromUrlLoaderNodeState> {
	public constructor(position: Coordinates) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], node: this},
				] as const;
				return FromUrlLoaderNodeDisplayer(...newParameters);
			},
			"From URL loader",
			position,
			new NoUrlFromUrlLoaderNodeState(),
		);
	}
	public override disconnectInputEdges(): void {}
	public async setUrl(url: string): Promise<void> {
		const loadingStartedState = this.state.startLoading(this.outputEdges);
		this.state = loadingStartedState;
		const image = await loadImageFromUrl(url);
		if (this.state === loadingStartedState) {
			this.state = loadingStartedState.doneLoading(image, this.outputEdges);
		}
	}
}
