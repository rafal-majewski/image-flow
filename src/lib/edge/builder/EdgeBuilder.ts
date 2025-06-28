import type {OperatingNode} from "../../node/operating/OperatingNode.svelte.ts";
export abstract class EdgeBuilder {
	public constructor(output: OperatingNode<number>, outputInputIndex: number) {
		this.output = output;
		this.outputInputIndex = outputInputIndex;
	}
	public readonly output: OperatingNode<number>;
	public readonly outputInputIndex: number;
}
