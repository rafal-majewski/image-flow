import type {Coordinates} from "../../coordinates/Coordinates.ts";
import {Node} from "../Node.svelte.ts";
import type {Operator} from "../operator/Operator.ts";
import {ManualInvalidAndNoOperatorOperatingNodeState} from "./state/implementations/manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatingNodeState.ts";
import type {SupportedOperatingNodeState} from "./state/supported/SupportedOperatingNodeState.ts";
import OperatingNodeDisplayer from "./displayer/OperatingNodeDisplayer.svelte";
import type {Edge} from "../../edge/Edge.ts";
export class OperatingNode<InputEdgeCount extends number> extends Node<
	SupportedOperatingNodeState<InputEdgeCount>
> {
	public constructor(
		inputEdgeCount: InputEdgeCount,
		name: string,
		availableOperators: readonly Operator<InputEdgeCount>[],
		position: Coordinates,
	) {
		const stepCount = 1;
		super(
			(...parameters) => {
				const newParameters = [
					parameters[0],
					{...parameters[1], node: this},
				] as const;
				return OperatingNodeDisplayer(...newParameters);
			},
			name,
			position,
			new ManualInvalidAndNoOperatorOperatingNodeState(stepCount),
		);
		this.availableOperators = availableOperators;
		this.inputEdges = $state.raw(
			new Array(inputEdgeCount).fill(null) as unknown as readonly Edge[] & {
				readonly length: InputEdgeCount;
			},
		);
		this.tryToValidateInputEdges();
	}
	public readonly availableOperators: readonly Operator<InputEdgeCount>[];
	public deleteInputEdge(index: number): void {
		this.inputEdges = this.inputEdges.with(
			index,
			null,
		) as unknown as readonly Edge[] & {readonly length: InputEdgeCount};
	}
	public override disconnectInputEdges(): void {
		for (const edge of this.inputEdges) {
			if (edge !== null) {
				edge.delete();
			}
		}
	}
	public doManualSteps(): void {
		this.state = this.state.doManualSteps(this.outputEdges);
	}
	public inputEdges: readonly (Edge | null)[] & {
		readonly length: InputEdgeCount;
	};
	public invalidateInputImages(): void {
		this.state = this.state.invalidateInputImages(this.outputEdges);
	}
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
	public resetOutputImage(): void {
		this.state = this.state.resetOutputImage(this.outputEdges);
	}
	public setInputEdge(edge: Edge, index: number): void {
		this.inputEdges = this.inputEdges.with(
			index,
			edge,
		) as unknown as readonly Edge[] & {readonly length: InputEdgeCount};
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
	public setOperator(operator: Operator<InputEdgeCount>): void {
		this.state = this.state.setOperator(operator, this.outputEdges);
	}
	public setStepCount(stepCount: number): void {
		this.state = this.state.setStepCount(stepCount);
	}
	public tryToValidateInputEdges(): void {
		if (
			this.inputEdges.every((edge) => {
				return edge !== null && edge.image !== null;
			})
		) {
			this.state = this.state.validateInputImages(
				this.inputEdges.map((edge) => {
					return (edge as Edge & {image: ImageData}).image;
				}) as unknown as readonly ImageData[] & {
					readonly length: InputEdgeCount;
				},
				this.outputEdges,
			);
		}
	}
	public unsetInputEdge(index: number): void {
		this.inputEdges = this.inputEdges.with(
			index,
			null,
		) as unknown as readonly Edge[] & {readonly length: InputEdgeCount};
	}
	public unsetOperator(): void {
		this.state = this.state.unsetOperator(this.outputEdges);
	}
}
