import type {InputterNode} from "./InputterNode.ts";
import type {Mapper} from "./Mapper.ts";
export class MapperNode implements InputterNode {
	private mapper: Mapper | null;
	public readonly id: string;
	private inputImage: ImageData | null;
	private outputImage: ImageData | null;
	private readonly nextNodes: readonly InputterNode[];
	public constructor(id: string) {
		this.id = id;
		this.inputImage = null;
		this.outputImage = null;
		this.nextNodes = [];
		this.mapper = null;
	}
	public setMapper(mapper: Mapper): void {
		this.mapper = mapper;
		if (this.inputImage) {
			this.outputImage = this.mapper.map(this.inputImage);
		}
	}
	public invalidate(): void {
		this.inputImage = null;
		this.outputImage = null;
		for (const node of this.nextNodes) {
			node.invalidate();
		}
	}
	public input(image: ImageData): void {
		this.inputImage = image;
		if (this.mapper) {
			this.outputImage = this.mapper.map(this.inputImage);
			for (const node of this.nextNodes) {
				node.input(this.outputImage);
			}
		}
	}
}
