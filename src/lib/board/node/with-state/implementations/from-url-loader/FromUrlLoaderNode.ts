import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import {WithStateNode} from "../../WithStateNode.svelte.ts";
import FromUrlLoaderNodeDisplayer from "./displayer/FromUrlLoaderNodeDisplayer.svelte";
import {loadUrl} from "./loading-url/loadUrl.ts";
import type {FromUrlLoaderNodeState} from "./state/FromUrlLoaderNodeState.ts";
import {NoUrlFromUrlLoaderNodeState} from "./state/implementations/no-url/NoUrlFromUrlLoaderNodeState.ts";
export class FromUrlLoaderNode extends WithStateNode<
	0,
	FromUrlLoaderNodeState
> {
	public override invalidateInputImages(): void {}
	protected override validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: 0}>,
	): void {}
	public constructor(position: Coordinates) {
		super(
			// @ts-expect-error: TODO
			FromUrlLoaderNodeDisplayer,
			0,
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
			this.state = loadingStartedState.doneLoading(image);
		}
	}
}
