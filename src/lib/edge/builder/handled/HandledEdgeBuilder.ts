import type {Node} from "../../../node/Node.svelte.ts";
import type {OperatingNode} from "../../../node/operating/OperatingNode.svelte.ts";
import type {NodeState} from "../../../node/state/NodeState.ts";
import {Edge} from "../../Edge.ts";
import {EdgeBuilder} from "../EdgeBuilder.ts";
export class HandledEdgeBuilder extends EdgeBuilder {
	public constructor(
		input: Node<NodeState>,
		output: OperatingNode<number>,
		outputInputIndex: number,
	) {
		super(output, outputInputIndex);
		this.input = input;
	}
	public buildWithImage(image: ImageData): void {
		const edge = new Edge(
			image,
			this.input,
			this.output,
			this.outputInputIndex,
		);
		this.input.addOutputEdge(edge);
		this.output.deleteInputEdge(this.outputInputIndex);
		this.output.setInputEdge(edge, this.outputInputIndex);
		this.output.tryToValidateInputEdges();
	}
	public buildWithoutImage(): void {
		const edge = new Edge(null, this.input, this.output, this.outputInputIndex);
		this.input.addOutputEdge(edge);
		this.output.deleteInputEdge(this.outputInputIndex);
		this.output.setInputEdge(edge, this.outputInputIndex);
		this.output.invalidateInputImages();
	}
	private readonly input: Node<NodeState>;
}
