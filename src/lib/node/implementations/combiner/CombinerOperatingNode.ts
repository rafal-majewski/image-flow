import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {OperatingNode} from "../../operating/OperatingNode.svelte.ts";
import {availableCombinerOperators} from "./operator/available/availableCombinerOperators.ts";
export class CombinerOperatingNode extends OperatingNode<2> {
	constructor(position: Coordinates) {
		super(2, "Combiner", availableCombinerOperators, position);
	}
}
