import type {Node} from "../../node/Node.svelte.ts";
import {Edge} from "../Edge.ts";
export abstract class EdgeBuilder {
	protected readonly index: number;
	protected readonly output: Node<number>;
	public constructor(index: number, output: Node<number>) {
		this.index = index;
		this.output = output;
	}
}
