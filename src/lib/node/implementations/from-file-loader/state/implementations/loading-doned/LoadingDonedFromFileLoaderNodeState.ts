import type {HandledEdgeBuilder} from "../../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
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
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithImage(this.image);
	}
	public override validateInputImages(inputImages: readonly []): this {
		return this;
	}
}
