import type {Node} from "../../../../node/Node.svelte.ts";
import type {OutputEdge} from "../OutputEdge.ts";
export interface OutputEdgeBuilder2 {
	buildWithImage(image: ImageData): void;
}
