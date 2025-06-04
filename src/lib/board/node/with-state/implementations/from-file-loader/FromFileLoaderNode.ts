import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import {WithStateNode} from "../../WithStateNode.svelte.ts";
import FromFileLoaderNodeDisplayer from "./displayer/FromFileLoaderNodeDisplayer.svelte";
import {loadFile} from "./loading-file/loadFile.ts";
import type {FromFileLoaderNodeState} from "./state/FromFileLoaderNodeState.ts";
import {NoFileFromFileLoaderNodeState} from "./state/implementations/no-file/NoFileFromFileLoaderNodeState.ts";
export class FromFileLoaderNode extends WithStateNode<
	0,
	FromFileLoaderNodeState
> {
	public override invalidateInputImages(): void {}
	protected override validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: 0}>,
	): void {}
	public constructor(position: Coordinates) {
		super(
			// @ts-expect-error: TODO
			FromFileLoaderNodeDisplayer,
			0,
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
			this.state = loadingStartedState.doneLoading(image);
		}
	}
}
