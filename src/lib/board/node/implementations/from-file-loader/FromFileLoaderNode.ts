import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import type {WithImageEdge} from "../../../edge/implementations/with-image/WithImageEdge.ts";
import type {WithoutImageEdge} from "../../../edge/implementations/without-image/WithoutImageEdge.ts";
import {Node} from "../../Node.svelte.ts";
import FromFileLoaderNodeDisplayer from "./displayer/FromFileLoaderNodeDisplayer.svelte";
import type {FromFileLoaderNodeState} from "./FromFileLoaderNodeState.ts";
import {NoFileFromFileLoaderNodeState} from "./NoFileFromFileLoaderNodeState.ts";
export class FromFileLoaderNode extends Node<0> {
	public constructor(position: Coordinates) {
		super(
			// @ts-expect-error: TODO
			FromFileLoaderNodeDisplayer,
			0,
			"From file loader",
			position,
			new NoFileFromFileLoaderNodeState([]),
		);
		console.log(this.state);
	}
	public async setFile(file: File): Promise<void> {
		const withFileState = this.state.setFile(file);
		this.state = withFileState;
		const withImageState = await withFileState.loadFile();
		if (this.state === withFileState) {
			this.state = withImageState;
		}
	}
	declare public state: FromFileLoaderNodeState<
		WithImageEdge | WithoutImageEdge
	>;
}
