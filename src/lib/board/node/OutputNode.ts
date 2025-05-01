import type {Node} from "./Node.svelte.ts";
export interface OutputNode extends Node {
	setInputNodeWithImage(inputNode: Node, inputNodeImage: ImageData): void;
	setInputNodeWithoutImage(inputNode: Node): void;
	setInputNodeImage(inputImage: ImageData): void;
	unsetInputNodeImage(): void;
	unsetInputNode(): void;
}
