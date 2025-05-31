import type {Edge} from "../../../Edge.ts";
import type {EdgePut} from "../../EdgePut.ts";
export interface OutEdgePut extends EdgePut {
	setInputEdge(edge: Edge): void;
}
