import type {HandledEdgeBuilder} from "../../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import {StaticNodeState} from "../../StaticNodeState.ts";
import {LoadingDonedStaticNodeState} from "../loading-doned/LoadingDonedStaticNodeState.ts";
export class LoadingStartedStaticNodeState extends StaticNodeState {
	public constructor(imageFilePath: string) {
		super("started");
		this.imageFilePath = imageFilePath;
	}
	public doneLoading(
		image: ImageData,
		outputEdges: readonly Edge[],
	): LoadingDonedStaticNodeState {
		for (const edge of outputEdges) {
			edge.setImage(image);
		}
		return new LoadingDonedStaticNodeState(image, this.imageFilePath);
	}
	public readonly imageFilePath: string;
	public override startLoading(
		newImageFilePath: string,
		outputEdges: readonly Edge[],
	): LoadingStartedStaticNodeState {
		return new LoadingStartedStaticNodeState(newImageFilePath);
	}
	override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
}
