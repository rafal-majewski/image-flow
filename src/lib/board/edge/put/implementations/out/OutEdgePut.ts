import type {Edge} from "../../../Edge.ts";
import type {EdgePut} from "../../EdgePut.ts";
export interface OutEdgePut extends EdgePut {
	unsetInputEdge(index: number): void;
	setInputEdge(edge: Edge): void;
}
