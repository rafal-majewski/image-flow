import type {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {OperatableNode} from "../../OperatableNode.svelte.ts";
import {combinerOperators} from "./combinerOperators.ts";
export class CombinerOperatableNode extends OperatableNode<2> {
	constructor(position: Coordinates) {
		super(2, "Combiner", combinerOperators, position);
	}
}
