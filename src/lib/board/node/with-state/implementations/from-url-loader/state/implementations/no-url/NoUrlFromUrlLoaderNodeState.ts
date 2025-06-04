import type {HandledEdgeBuilder} from "../../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../../edge/Edge.ts";
import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {LoadingStartedFromUrlLoaderNodeState} from "../loading-started/LoadingStartedFromUrlLoaderNodeState.ts";
export class NoUrlFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public constructor() {
		super("unconfigured");
	}
	public override invalidateInputImages(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override startLoading(
		outputEdges: readonly Edge[],
	): LoadingStartedFromUrlLoaderNodeState {
		return new LoadingStartedFromUrlLoaderNodeState();
	}
	public override validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: 0}>,
	): this {
		return this;
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
}
