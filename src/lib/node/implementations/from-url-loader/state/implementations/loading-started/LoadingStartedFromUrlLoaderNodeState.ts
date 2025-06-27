import type {HandledEdgeBuilder} from "../../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {LoadingDonedFromUrlLoaderNodeState} from "../loading-doned/LoadingDonedFromUrlLoaderNodeState.ts";
export class LoadingStartedFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public constructor() {
		super("started");
	}
	public doneLoading(
		image: ImageData,
		outputEdges: readonly Edge[],
	): LoadingDonedFromUrlLoaderNodeState {
		for (const edge of outputEdges) {
			edge.setImage(image);
		}
		return new LoadingDonedFromUrlLoaderNodeState(image);
	}
	public override invalidateInputImages(outputEdges: readonly Edge[]): this {
		return this;
	}
	public startLoading(
		outputEdges: readonly Edge[],
	): LoadingStartedFromUrlLoaderNodeState {
		return new LoadingStartedFromUrlLoaderNodeState();
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
	public override validateInputImages(
		inputImages: readonly [],
		outputEdges: readonly Edge[],
	): this {
		return this;
	}
}
