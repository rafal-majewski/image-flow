import type {HandledEdgeBuilder} from "../../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import {FromFileLoaderNodeState} from "../../FromFileLoaderNodeState.ts";
import {LoadingStartedFromFileLoaderNodeState} from "../loading-started/LoadingStartedFromFileLoaderNodeState.ts";
export class NoFileFromFileLoaderNodeState extends FromFileLoaderNodeState {
	public constructor() {
		super("unconfigured");
	}
	public override startLoading(
		outputEdges: readonly Edge[],
	): LoadingStartedFromFileLoaderNodeState {
		return new LoadingStartedFromFileLoaderNodeState();
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
}
