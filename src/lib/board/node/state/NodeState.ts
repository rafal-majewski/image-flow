import type {Edge} from "../../edge/Edge.ts";
import type {OutputEdge} from "../../edge/types/output/OutputEdge.ts";
import type {Node} from "../Node.svelte.ts";
import type {NodeStatus} from "../status/NodeStatus.ts";
export abstract class NodeState {
	public constructor(status: NodeStatus) {
		this.status = status;
	}
	public abstract doAnimatedStep(outputEdges: readonly OutputEdge[]): NodeState;
	public abstract doManualSteps(outputEdges: readonly OutputEdge[]): NodeState;
	public abstract handleOutputEdgeBuilder(
		outputEdgeBuilder: UnhandledOutputEdgeBuilder,
	): HandledOutputEdgeBuilder;
	public abstract makeAnimated(
		intervalId: NodeJS.Timeout,
		intervalIntervalSeconds: number,
	): NodeState;
	public abstract makeInstant(outputEdges: readonly OutputEdge[]): NodeState;
	public abstract makeManual(stepCount: number): NodeState;
	public abstract resetOutputImage(
		outputEdges: readonly OutputEdge[],
	): NodeState;
	public abstract setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): NodeState;
	public abstract setStepCount(stepCount: number): NodeState;
	public readonly status: NodeStatus;
}
