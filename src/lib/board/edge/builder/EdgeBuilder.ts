import type {OutEdgePut} from "../put/implementations/out/OutEdgePut.ts";
export abstract class EdgeBuilder {
	public constructor(index: number, output: OutEdgePut) {
		this.index = index;
		this.output = output;
	}
	protected readonly index: number;
	protected readonly output: OutEdgePut;
}
