import type {HandledEdgeBuilder} from "../../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../../edge/Edge.ts";
import {FromFileLoaderNodeState} from "../../FromFileLoaderNodeState.ts";
import {LoadingStartedFromFileLoaderNodeState} from "../loading-started/LoadingStartedFromFileLoaderNodeState.ts";
export class LoadingDonedFromFileLoaderNodeState extends FromFileLoaderNodeState {
	public constructor(image: ImageData) {
		super("doned");
		this.image = image;
	}
	public readonly image: ImageData;
	public override invalidateInputImages(outputEdges: readonly Edge[]): this {
		return this;
	}
	public startLoading(
		outputEdges: readonly Edge[],
	): LoadingStartedFromFileLoaderNodeState {
		for (const edge of outputEdges) {
			edge.unsetImage();
		}
		return new LoadingStartedFromFileLoaderNodeState();
	}
	public override validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: 0}>,
	): this {
		return this;
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithImage(this.image);
	}
}
