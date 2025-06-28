import type {HandledEdgeBuilder} from "../../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {LoadingStartedFromUrlLoaderNodeState} from "../loading-started/LoadingStartedFromUrlLoaderNodeState.ts";
export class LoadingDoneFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public constructor(image: ImageData) {
		super("doned");
		this.image = image;
	}
	public readonly image: ImageData;
	public startLoading(
		outputEdges: readonly Edge[],
	): LoadingStartedFromUrlLoaderNodeState {
		for (const edge of outputEdges) {
			edge.unsetImage();
		}
		return new LoadingStartedFromUrlLoaderNodeState();
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithImage(this.image);
	}
}
