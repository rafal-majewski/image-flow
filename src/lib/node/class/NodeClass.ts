import type {Coordinates} from "../../coordinates/Coordinates.ts";
import type {Node} from "../Node.svelte.ts";
import type {NodeState} from "../state/NodeState.ts";
export type NodeClass = new (coordinates: Coordinates) => Node<NodeState>;
