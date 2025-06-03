import type {Edge} from "../../../Edge.ts";
import type {EdgePut} from "../../EdgePut.ts";
export interface InEdgePut extends EdgePut {
	deleteOutputEdge(edge: Edge): void;
}
