import type {Node} from "../../node/Node.svelte.ts";
import type {Edge} from "../Edge.ts";
export interface HandledEdgeBuilder<OutputNodeToUse extends Node> {
	build(outputNode: OutputNodeToUse): Edge<OutputNodeToUse>;
}
