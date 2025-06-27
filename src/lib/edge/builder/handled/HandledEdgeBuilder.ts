import type {Node} from "../../../node/Node.ts";
import {Edge} from "../../Edge.ts";
import type {EdgeBuilder} from "../../EdgeBuilder.ts";
export class HandledEdgeBuilder implements EdgeBuilder {
	public constructor(
		inputIndexInOutput: number,
		input: Node,
		output: IntermediateNode,
	) {
		this.inputIndexInOutput = inputIndexInOutput;
		this.input = input;
		this.output = output;
	}
	public buildWithImage(image: ImageData): void {
		const edge = new Edge(
			`${this.input.id}-${this.inputIndexInOutput}-${this.output.id}`,
			image,
			this.inputIndexInOutput,
			this.input,
			this.output,
		);
		this.input.addOutputEdge(edge);
		this.output.clearInputEdgeLeft(this.inputIndexInOutput);
		this.output.setInputEdge(this.inputIndexInOutput, edge);
		this.output.validateInputEdges();
	}
	public buildWithoutImage(): void {
		const edge = new Edge(
			`${this.input.id}-${this.inputIndexInOutput}-${this.output.id}`,
			null,
			this.inputIndexInOutput,
			this.input,
			this.output,
		);
		this.input.addOutputEdge(edge);
		this.output.clearInputEdgeLeft(this.inputIndexInOutput);
		this.output.setInputEdge(this.inputIndexInOutput, edge);
		this.output.invalidateInputImages();
	}
	private readonly input: Node;
	public readonly inputIndexInOutput: number;
	public readonly output: IntermediateNode;
}
