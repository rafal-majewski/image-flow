import type {Node} from "./Node.svelte.ts";
export interface OutputNode extends Node {
	setInputNodeWithInputImage(inputNode: Node, inputImage: ImageData): void;
	setInputNodeWithoutInputImage(inputNode: Node): void;
	setInputImage(inputImage: ImageData): void;
	unsetInputImage(): void;
	unsetInputNode(): void;
}
