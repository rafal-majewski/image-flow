import type {UnhandledEdgeBuilder} from "../../../builder/implementations/unhandled/UnhandledEdgeBuilder.ts";
import type {EdgePut} from "../../EdgePut.ts";
export interface InEdgePut extends EdgePut {
	addOutputEdge(builder: UnhandledEdgeBuilder): void;
}
