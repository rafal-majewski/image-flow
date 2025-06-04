import type {Node} from "../node/Node.svelte.ts";
import type {EdgeId} from "./id/EdgeId.ts";
export class Edge {
	public constructor(
		id: EdgeId,
		image: ImageData | null,
		index: number,
		input: Node<number>,
		output: Node<number>,
	) {
		this.id = id;
		this.image = image;
		this.index = index;
		this.input = input;
		this.output = output;
	}
	public delete(): void {
		this.input.deleteOutputEdge(this);
		this.output.unsetInputEdge(this.index);
		this.output.invalidateInputImages();
	}
	public deleteLeft(): void {
		this.input.deleteOutputEdge(this);
	}
	public readonly id: EdgeId;
	/**
	 * Do not reassign externally.
	 */
	public image: ImageData | null;
	public readonly index: number;
	public readonly input: Node<number>;
	public readonly output: Node<number>;
	public setImage(newImage: ImageData): void {
		this.image = newImage;
		this.output.validateInputEdges();
	}
	public unsetImage(): void {
		this.image = null;
		this.output.invalidateInputImages();
	}
}
