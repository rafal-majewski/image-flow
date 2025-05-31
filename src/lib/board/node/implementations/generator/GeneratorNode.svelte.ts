import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {Node} from "../../Node.svelte.ts";
export class GeneratorNode extends Node<0, "Generator"> {
	public constructor(position: Coordinates) {
		super("Generator", position, 0);
	}
}
