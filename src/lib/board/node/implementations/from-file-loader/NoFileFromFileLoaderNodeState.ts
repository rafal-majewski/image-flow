import type {HandledEdgeBuilder} from "../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../edge/Edge.ts";
import type {WithoutImageEdge} from "../../../edge/implementations/without-image/WithoutImageEdge.ts";
import {FromFileLoaderNodeState} from "./FromFileLoaderNodeState.ts";
import {WithFileFromFileLoaderNodeState} from "./WithFileFromFileLoaderNodeState.ts";
export class NoFileFromFileLoaderNodeState extends FromFileLoaderNodeState<WithoutImageEdge> {
	public override setFile(file: File): WithFileFromFileLoaderNodeState {
		return new WithFileFromFileLoaderNodeState(file, this.outputEdges);
	}
	public constructor(outputEdges: readonly WithoutImageEdge[]) {
		super(outputEdges, "unconfigured");
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): NoFileFromFileLoaderNodeState {
		return new NoFileFromFileLoaderNodeState([
			...this.outputEdges,
			builder.buildWithoutImage(),
		]);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): NoFileFromFileLoaderNodeState {
		return new NoFileFromFileLoaderNodeState(
			this.outputEdges.filter((edge) => edge !== edgeToBeDeleted),
		);
	}
	public override invalidateInputImages(): this {
		return this;
	}
	public override validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: 0}>,
	): this {
		return this;
	}
}
