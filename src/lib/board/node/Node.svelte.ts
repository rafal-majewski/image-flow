import type {Coordinates} from "../coordinates/Coordinates.ts";
import type {OutputEdge} from "../edge/types/output/OutputEdge.ts";
import {generateNodeId} from "./id/generation/generateNodeId.ts";
import type {NodeId} from "./id/NodeId.ts";
import type {NodeState} from "./state/NodeState.ts";
export abstract class Node<NodeStateToUse extends NodeState> {
	protected constructor(position: Coordinates, state: NodeStateToUse) {
		this.id = generateNodeId();
		this.position = position;
		this.outputEdges = [];
		this.state = state;
	}
	public addOutputEdge(outputEdgeBuilder: UnhandledOutputEdgeBuilder): void {
		this.outputEdges = [
			...this.outputEdges,
			this.state.handleOutputEdgeBuilder(outputEdgeBuilder).build(this),
		];
	}
	public doManualSteps(): void {
		this.state = this.state.doManualSteps(this.outputEdges);
	}
	private readonly id: NodeId;
	public makeAnimated(): void {
		const intervalIntervalSeconds = 0.001;
		const intervalId = setInterval(() => {
			this.state = this.state.doAnimatedStep(this.outputEdges);
		}, intervalIntervalSeconds * 1000);
		this.state = this.state.makeAnimated(intervalId, intervalIntervalSeconds);
	}
	public makeInstant(): void {
		this.state = this.state.makeInstant(this.outputEdges);
	}
	public makeManual(): void {
		const stepCount = 1;
		this.state = this.state.makeManual(stepCount);
	}
	/**
	 * Do not reassign externally.
	 */
	public outputEdges: readonly OutputEdge[] =
		$state.raw() as readonly OutputEdge[];
	public position: Coordinates = $state.raw() as Coordinates;
	public resetOutputImage(): void {
		this.state = this.state.resetOutputImage(this.outputEdges);
	}
	public setIntervalInterval(intervalIntervalSeconds: number): void {
		const intervalId = setInterval(() => {
			this.state = this.state.doAnimatedStep(this.outputEdges);
		}, intervalIntervalSeconds * 1000);
		this.state = this.state.setIntervalInterval(
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public setStepCount(stepCount: number): void {
		this.state = this.state.setStepCount(stepCount);
	}
	public state: NodeStateToUse = $state.raw() as NodeStateToUse;
}
