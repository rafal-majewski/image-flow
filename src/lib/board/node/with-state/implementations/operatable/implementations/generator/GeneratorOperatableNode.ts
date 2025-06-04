import type {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {OperatableNode} from "../../OperatableNode.svelte.ts";
import {generatorOperators} from "./generatorOperators.ts";
export class GeneratorOperatableNode extends OperatableNode<0> {
	public constructor(position: Coordinates) {
		super(0, "Generator", generatorOperators, position);
	}
}
