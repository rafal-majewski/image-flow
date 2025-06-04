import type {HandledEdgeBuilder} from "../../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../../edge/Edge.ts";
import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {LoadingDonedFromUrlLoaderNodeState} from "../loading-doned/LoadingDonedFromUrlLoaderNodeState.ts";
export class LoadingStartedFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public override invalidateInputImages(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override validateInputImages(
		inputImages: readonly [],
		outputEdges: readonly Edge[],
	): this {
		return this;
	}
	public constructor() {
		super("started");
	}
	public startLoading(
		outputEdges: readonly Edge[],
	): LoadingStartedFromUrlLoaderNodeState {
		return new LoadingStartedFromUrlLoaderNodeState();
	}
	public doneLoading(image: ImageData): LoadingDonedFromUrlLoaderNodeState {
		return new LoadingDonedFromUrlLoaderNodeState(image);
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
}
