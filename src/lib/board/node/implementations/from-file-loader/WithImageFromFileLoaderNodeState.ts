import type {HandledEdgeBuilder} from "../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../edge/Edge.ts";
import type {WithImageEdge} from "../../../edge/implementations/with-image/WithImageEdge.ts";
import {FromFileLoaderNodeState} from "./FromFileLoaderNodeState.ts";
import {WithFileFromFileLoaderNodeState} from "./WithFileFromFileLoaderNodeState.ts";
export class WithImageFromFileLoaderNodeState extends FromFileLoaderNodeState<WithImageEdge> {
	public override setFile(file: File): WithFileFromFileLoaderNodeState {
		return new WithFileFromFileLoaderNodeState(file, this.outputEdges);
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): WithImageFromFileLoaderNodeState {
		return new WithImageFromFileLoaderNodeState(this.image, [
			...this.outputEdges,
			builder.buildWithImage(this.image),
		]);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): WithImageFromFileLoaderNodeState {
		return new WithImageFromFileLoaderNodeState(this.image, [
			...this.outputEdges.filter((edge) => edge !== edgeToBeDeleted),
		]);
	}
	public override invalidateInputImages(): this {
		return this;
	}
	public override validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: 0}>,
	): this {
		return this;
	}
	public constructor(image: ImageData, outputEdges: readonly WithImageEdge[]) {
		super(outputEdges, "done");
		this.image = image;
	}
	public readonly image: ImageData;
}
