import type {Node} from "../../../../node/Node.svelte.ts";
import {Edge} from "../../../Edge.ts";
import {EdgeBuilder} from "../../EdgeBuilder.ts";
export class HandledEdgeBuilder extends EdgeBuilder {
	public constructor(index: number, input: Node<number>, output: Node<number>) {
		super(index, output);
		this.input = input;
	}
	public buildWithImage(image: ImageData): void {
		const edge = new Edge(
			`${this.input.id}-${this.index}-${this.output.id}`,
			image,
			this.index,
			this.input,
			this.output,
		);
		this.input.addOutputEdge(edge);
		this.output.clearInputEdgeLeft(this.index);
		this.output.setInputEdge(this.index, edge);
		this.output.validateInputEdges();
	}
	public buildWithoutImage(): void {
		const edge = new Edge(
			`${this.input.id}-${this.index}-${this.output.id}`,
			null,
			this.index,
			this.input,
			this.output,
		);
		this.input.addOutputEdge(edge);
		this.output.clearInputEdgeLeft(this.index);
		this.output.setInputEdge(this.index, edge);
		this.output.invalidateInputImages();
	}
	private readonly input: Node<number>;
}
