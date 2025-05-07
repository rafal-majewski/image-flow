import type {Coordinates} from "../../coordinates/Coordinates.ts";
import type {Node} from "../Node.svelte.ts";
export type NodeClass = new (coordinates: Coordinates) => Node;
