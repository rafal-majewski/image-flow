import type {HandledEdgeBuilder} from "../../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../../edge/Edge.ts";
import {FromFileLoaderNodeState} from "../../FromFileLoaderNodeState.ts";
import {LoadingDonedFromFileLoaderNodeState} from "../loading-doned/LoadingDonedFromFileLoaderNodeState.ts";
export class LoadingStartedFromFileLoaderNodeState extends FromFileLoaderNodeState {
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
	): LoadingStartedFromFileLoaderNodeState {
		return new LoadingStartedFromFileLoaderNodeState();
	}
	public doneLoading(image: ImageData): LoadingDonedFromFileLoaderNodeState {
		return new LoadingDonedFromFileLoaderNodeState(image);
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
}
