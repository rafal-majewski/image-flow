import type {Coordinates} from "./Coordinates";
import type {SupportedNode} from "./SupportedNode";
export type SupportedNodeClass = new (position: Coordinates) => SupportedNode;
