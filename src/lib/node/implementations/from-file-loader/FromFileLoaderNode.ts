import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
import FromFileLoaderNodeDisplayer from "./displayer/FromFileLoaderNodeDisplayer.svelte";
import {loadImageFromFile} from "./loading-image-from-file/loadImageFromFile.ts";
import type {FromFileLoaderNodeState} from "./state/FromFileLoaderNodeState.ts";
import {NoFileFromFileLoaderNodeState} from "./state/implementations/no-file/NoFileFromFileLoaderNodeState.ts";
export class FromFileLoaderNode extends Node<FromFileLoaderNodeState> {
	public constructor(position: Coordinates) {
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], node: this},
				] as const;
				return FromFileLoaderNodeDisplayer(...newParameters);
			},
			"From file loader",
			position,
			new NoFileFromFileLoaderNodeState(),
		);
	}
	public override disconnectInputEdges(): void {}
	public async setFile(file: File): Promise<void> {
		const loadingStartedState = this.state.startLoading(this.outputEdges);
		this.state = loadingStartedState;
		const image = await loadImageFromFile(file);
		if (this.state === loadingStartedState) {
			this.state = loadingStartedState.doneLoading(image, this.outputEdges);
		}
	}
}
