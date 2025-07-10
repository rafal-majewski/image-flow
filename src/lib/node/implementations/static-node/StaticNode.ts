import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import StaticNodeDisplayer from "./displayer/StaticNodeDisplayer.svelte";
import {loadImageFromFilePath} from "./loading-static-image/loadImageFromFilePath.ts";
import type {StaticNodeState} from "./state/StaticNodeState.ts";
import {NoImagePathStaticNodeState} from "./state/implementations/no-image-path/NoImagePathStaticNodeState.ts";
export class StaticNode extends Node<StaticNodeState> {
	public constructor(position: Coordinates) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], node: this},
				] as const;
				return StaticNodeDisplayer(...newParameters);
			},
			"Static",
			position,
			new NoImagePathStaticNodeState(),
		);
	}
	public override disconnectInputEdges(): void {}
	public async setImageFilePath(imageFilePath: string): Promise<void> {
		const loadingStartedState = this.state.startLoading(
			imageFilePath,
			this.outputEdges,
		);
		this.state = loadingStartedState;
		const image = await loadImageFromFilePath(imageFilePath);
		if (this.state === loadingStartedState) {
			this.state = loadingStartedState.doneLoading(image, this.outputEdges);
		}
	}
}
