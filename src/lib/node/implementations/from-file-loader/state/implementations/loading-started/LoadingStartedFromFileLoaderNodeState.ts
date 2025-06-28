import type {HandledEdgeBuilder} from "../../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import {FromFileLoaderNodeState} from "../../FromFileLoaderNodeState.ts";
import {LoadingDoneFromFileLoaderNodeState} from "../loading-doned/LoadingDoneFromFileLoaderNodeState.ts";
export class LoadingStartedFromFileLoaderNodeState extends FromFileLoaderNodeState {
	public constructor() {
		super("started");
	}
	public doneLoading(
		image: ImageData,
		outputEdges: readonly Edge[],
	): LoadingDoneFromFileLoaderNodeState {
		for (const edge of outputEdges) {
			edge.setImage(image);
		}
		return new LoadingDoneFromFileLoaderNodeState(image);
	}
	public startLoading(
		outputEdges: readonly Edge[],
	): LoadingStartedFromFileLoaderNodeState {
		return new LoadingStartedFromFileLoaderNodeState();
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
}
