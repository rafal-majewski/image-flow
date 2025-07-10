import type {HandledEdgeBuilder} from "../../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import {StaticNodeState} from "../../StaticNodeState.ts";
import {LoadingStartedStaticNodeState} from "../loading-started/LoadingStartedStaticNodeState.ts";
export class LoadingDonedStaticNodeState extends StaticNodeState {
	public constructor(image: ImageData, imageFilePath: string) {
		super("doned");
		this.image = image;
		this.imageFilePath = imageFilePath;
	}
	public readonly image: ImageData;
	public readonly imageFilePath: string;
	public override startLoading(
		newImageFilePath: string,
		outputEdges: readonly Edge[],
	): LoadingStartedStaticNodeState {
		for (const edge of outputEdges) {
			edge.unsetImage();
		}
		return new LoadingStartedStaticNodeState(newImageFilePath);
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithImage(this.image);
	}
}
