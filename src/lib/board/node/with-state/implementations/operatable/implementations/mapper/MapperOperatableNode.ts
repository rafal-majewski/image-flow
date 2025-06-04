import type {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {OperatableNode} from "../../OperatableNode.svelte.ts";
import {mapperOperators} from "./mapperOperators.ts";
export class MapperOperatableNode extends OperatableNode<1> {
	public constructor(position: Coordinates) {
		super(1, "Mapper", mapperOperators, position);
	}
}
