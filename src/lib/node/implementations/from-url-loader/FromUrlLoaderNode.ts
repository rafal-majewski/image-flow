import type {Component} from "svelte";
import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {SupportedBoardMode} from "../../../mode/supported/SupportedBoardMode.ts";
import {Node} from "../../Node.svelte.ts";
import type {OperatingNode} from "../../operating/OperatingNode.svelte.ts";
import type {NodeState} from "../../state/NodeState.ts";
import FromUrlLoaderNodeDisplayer from "./displayer/FromUrlLoaderNodeDisplayer.svelte";
import {loadUrl} from "./loading-url/loadUrl.ts";
import {NoUrlFromUrlLoaderNodeState} from "./state/implementations/no-url/NoUrlFromUrlLoaderNodeState.ts";
import type {SupportedFromUrlLoaderNodeState} from "./state/supported/SupportedFromUrlLoaderNodeState.ts";
export class FromUrlLoaderNode extends Node<SupportedFromUrlLoaderNodeState> {
	public override disconnectInputEdges(): void {}
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
	public async setUrl(url: string): Promise<void> {
		const loadingStartedState = this.state.startLoading(this.outputEdges);
		this.state = loadingStartedState;
		const image = await loadUrl(url);
		if (this.state === loadingStartedState) {
			this.state = loadingStartedState.doneLoading(image, this.outputEdges);
		}
	}
}
