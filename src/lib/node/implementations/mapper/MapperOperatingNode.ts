import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {OperatingNode} from "../../operating/OperatingNode.svelte.ts";
import {availableMapperOperators} from "./operator/available/availableMapperOperators.ts";
export class MapperOperatingNode extends OperatingNode<1> {
	public constructor(position: Coordinates) {
		super(1, "Mapper", availableMapperOperators, position);
	}
}
