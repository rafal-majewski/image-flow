import type {Node} from "../../../node/Node.svelte.ts";
import type {OperatingNode} from "../../../node/operating/OperatingNode.svelte.ts";
import type {NodeState} from "../../../node/state/NodeState.ts";
import {Edge} from "../../Edge.ts";
export class HandledEdgeBuilder implements EdgeBuilder {
	public constructor(
		outputInputIndex: number,
		input: Node<NodeState>,
		output: OperatingNode<number>,
	) {
		this.outputInputIndex = outputInputIndex;
		this.input = input;
		this.output = output;
	}
	public buildWithImage(image: ImageData): void {
		const edge = new Edge(
			image,
			this.outputInputIndex,
			this.input,
			this.output,
		);
		this.input.addOutputEdge(edge);
		this.output.clearInputEdgeLeft(this.outputInputIndex);
		this.output.setInputEdge(this.outputInputIndex, edge);
		this.output.validateInputEdges();
	}
	public buildWithoutImage(): void {
		const edge = new Edge(null, this.outputInputIndex, this.input, this.output);
		this.input.addOutputEdge(edge);
		this.output.clearInputEdgeLeft(this.outputInputIndex);
		this.output.setInputEdge(this.outputInputIndex, edge);
		this.output.invalidateInputImages();
	}
	private readonly input: Node<NodeState>;
	public readonly outputInputIndex: number;
	public readonly output: OperatingNode<number>;
}
