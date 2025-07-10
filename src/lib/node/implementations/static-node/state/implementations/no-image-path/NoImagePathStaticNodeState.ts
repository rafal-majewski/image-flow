import type {HandledEdgeBuilder} from "../../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import {StaticNodeState} from "../../StaticNodeState.ts";
import {LoadingStartedStaticNodeState} from "../loading-started/LoadingStartedStaticNodeState.ts";
export class NoImagePathStaticNodeState extends StaticNodeState {
	public constructor() {
		super("unconfigured");
	}
	public override startLoading(
		imageFilePath: string,
		outputEdges: readonly Edge[],
	): LoadingStartedStaticNodeState {
		return new LoadingStartedStaticNodeState(imageFilePath);
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
}
