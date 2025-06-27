import type {HandledEdgeBuilder} from "../../../../../../edge/builder/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import {FromUrlLoaderNodeState} from "../../FromUrlLoaderNodeState.ts";
import {LoadingStartedFromUrlLoaderNodeState} from "../loading-started/LoadingStartedFromUrlLoaderNodeState.ts";
export class NoUrlFromUrlLoaderNodeState extends FromUrlLoaderNodeState {
	public constructor() {
		super("unconfigured");
	}
	public override invalidateInputImages(outputEdges: readonly Edge[]): this {
		return this;
	}
	public override startLoading(
		outputEdges: readonly Edge[],
	): LoadingStartedFromUrlLoaderNodeState {
		return new LoadingStartedFromUrlLoaderNodeState();
	}
	public override useEdgeBuilder(builder: HandledEdgeBuilder): void {
		builder.buildWithoutImage();
	}
	public override validateInputImages(inputImages: readonly []): this {
		return this;
	}
}
