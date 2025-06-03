import type {HandledEdgeBuilder} from "../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../edge/Edge.ts";
import type {WithoutImageEdge} from "../../../edge/implementations/without-image/WithoutImageEdge.ts";
import {FromFileLoaderNodeState} from "./FromFileLoaderNodeState.ts";
import {WithImageFromFileLoaderNodeState} from "./WithImageFromFileLoaderNodeState.ts";
import {readFile} from "./readFile.ts";
export class WithFileFromFileLoaderNodeState extends FromFileLoaderNodeState<WithoutImageEdge> {
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): WithFileFromFileLoaderNodeState {
		return new WithFileFromFileLoaderNodeState(this.file, [
			...this.outputEdges,
			builder.buildWithoutImage(),
		]);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): WithFileFromFileLoaderNodeState {
		return new WithFileFromFileLoaderNodeState(
			this.file,
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
	public override setFile(newFile: File): WithFileFromFileLoaderNodeState {
		return new WithFileFromFileLoaderNodeState(newFile, this.outputEdges);
	}
	public constructor(file: File, outputEdges: readonly WithoutImageEdge[]) {
		super(outputEdges, "in-progress");
		this.file = file;
	}
	private readonly file: File;
	public async loadFile(): Promise<WithImageFromFileLoaderNodeState> {
		const image = await readFile(this.file);
		return new WithImageFromFileLoaderNodeState(
			image,
			this.outputEdges.map((edge) => edge.withImage(image)),
		);
	}
}
