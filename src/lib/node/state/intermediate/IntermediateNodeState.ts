import type {Edge} from "../../../edge/Edge.ts";
import type {NodeState} from "../NodeState.ts";
export interface IntermediateNodeState<InputImageCount extends number>
	extends NodeState {
	validateInputImages(
		inputImages: readonly ImageData[] & {readonly length: InputImageCount},
		outputEdges: readonly Edge[],
	): IntermediateNodeState<InputImageCount>;
	invalidateInputImages(
		outputEdges: readonly Edge[],
	): IntermediateNodeState<InputImageCount>;
}
