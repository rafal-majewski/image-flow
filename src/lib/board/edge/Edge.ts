import type {Node} from "../node/Node.svelte.ts";
import type {OutputEdge} from "./types/output/OutputEdge.ts";
export abstract class Edge<OutputNodeToUse extends Node> implements OutputEdge {
	public constructor(inputNode: Node, outputNode: OutputNodeToUse) {
		this.inputNode = inputNode;
		this.outputNode = outputNode;
	}
	public readonly inputNode: Node;
	public readonly outputNode: OutputNodeToUse;
	public abstract setImage(image: ImageData): void;
	public abstract unsetImage(): void;
}
