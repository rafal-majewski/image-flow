import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {OperatingNode} from "../../with-state/implementations/operatable/OperatingNode.svelte.ts";
import {combinerOperators} from "./combinerOperators.ts";
export class CombinerOperatingNode extends OperatingNode<2> {
	constructor(position: Coordinates) {
		super(2, "Combiner", combinerOperators, position);
	}
}
