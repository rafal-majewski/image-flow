import type {Coordinates} from "../../coordinates/Coordinates.ts";
import {Node} from "../Node.svelte.ts";
import type {Operator} from "../operator/Operator.ts";
import {ManualInvalidAndNoOperatorOperatingNodeState} from "./state/implementations/manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatingNodeState.ts";
import type {SupportedOperatingNodeState} from "./state/supported/SupportedOperatingNodeState.ts";
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
			// @ts-expect-error: TODO
			OperatingNodeDisplayer,
			name,
			position,
			new ManualInvalidAndNoOperatorOperatingNodeState(stepCount),
		);
		this.availableOperators = availableOperators;
	}
	public readonly availableOperators: readonly Operator<InputEdgeCount>[];
	public doManualSteps(): void {
		this.state = this.state.doManualSteps(this.outputEdges);
	}
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
	public unsetOperator(): void {
		this.state = this.state.unsetOperator(this.outputEdges);
	}
	private validateInputImages(
		inputImages: readonly ImageData[] & {readonly length: InputEdgeCount},
	): void {
		this.state = this.state.validateInputImages(inputImages, this.outputEdges);
	}
}
