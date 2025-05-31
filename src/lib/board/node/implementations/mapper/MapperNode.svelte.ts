import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
export class MapperNode extends Node<1, "Mapper"> {
	public constructor(position: Coordinates) {
		super("Mapper", position, 1);
	}
}
