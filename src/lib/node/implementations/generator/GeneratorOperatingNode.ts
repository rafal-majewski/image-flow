import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {OperatingNode} from "../../operating/OperatingNode.svelte.ts";
import {availableGeneratorOperators} from "./operator/available/availableGeneratorOperators.ts";
export class GeneratorOperatingNode extends OperatingNode<0> {
	public constructor(position: Coordinates) {
		super(0, "Generator", availableGeneratorOperators, position);
	}
}
