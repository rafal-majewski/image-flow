export abstract class Mapper {
	public readonly id: string;
	protected constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
	public readonly name: string;
	public abstract map(
		inputImage: ImageData,
	): Generator<ImageData, ImageData, void>;
}
