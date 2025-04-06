import type {Coordinates} from "../coordinates/Coordinates.ts";
import type {SupportedNode} from "./SupportedNode.ts";
export type SupportedNodeClass = new (position: Coordinates) => SupportedNode;
