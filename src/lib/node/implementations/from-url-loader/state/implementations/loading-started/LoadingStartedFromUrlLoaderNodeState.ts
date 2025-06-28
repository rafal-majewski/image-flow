import type {HandledEdgeBuilder} from "../../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {LoadingDoneFromUrlLoaderNodeState} from "../loading-doned/LoadingDoneFromUrlLoaderNodeState.ts";
export class LoadingStartedFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public constructor() {
		super("started");
	}
	public doneLoading(
		image: ImageData,
		outputEdges: readonly Edge[],
	): LoadingDoneFromUrlLoaderNodeState {
		for (const edge of outputEdges) {
			edge.setImage(image);
		}
		return new LoadingDoneFromUrlLoaderNodeState(image);
	}
	public startLoading(
		outputEdges: readonly Edge[],
	): LoadingStartedFromUrlLoaderNodeState {
		return new LoadingStartedFromUrlLoaderNodeState();
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
}
