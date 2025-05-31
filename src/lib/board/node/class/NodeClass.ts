import type {Coordinates} from "../../coordinates/Coordinates.ts";
import type {Node} from "../Node.svelte.ts";
export type NodeClass<NodeToUse extends Node<number, string>> = new (
	coordinates: Coordinates,
) => NodeToUse;
