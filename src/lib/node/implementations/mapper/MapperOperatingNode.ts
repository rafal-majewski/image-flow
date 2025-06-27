import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {OperatingNode} from "../../operating/OperatingNode.svelte.ts";
import {mapperOperators} from "./mapperOperators.ts";
export class MapperOperatingNode extends OperatingNode<1> {
	public constructor(position: Coordinates) {
		super(1, "Mapper", mapperOperators, position);
	}
}
