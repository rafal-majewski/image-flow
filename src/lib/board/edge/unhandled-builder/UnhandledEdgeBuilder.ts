import type {Node} from "../../node/Node.svelte.ts";
import type {HandledEdgeBuilder} from "../handled-builder/HandledEdgeBuilder.ts";
export interface UnhandledEdgeBuilder<OutputNodeToUse extends Node> {
	withImage(image: ImageData): HandledEdgeBuilder<OutputNodeToUse>;
	withoutImage(image: ImageData): HandledEdgeBuilder<OutputNodeToUse>;
}
