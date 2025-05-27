import {Node} from "../../Node.svelte.ts";
import type {NodeStatus} from "../../status/NodeStatus.ts";
export class GeneratorNode extends Node {
	protected override disconnectInputEdges(): void {}
}
