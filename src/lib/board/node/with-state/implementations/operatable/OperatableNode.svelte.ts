import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
import type {Operator} from "./operator/Operator.ts";
import {ManualInvalidAndNoOperatorOperatableNodeState} from "./state/implementations/manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatableNodeState.ts";
import type {SupportedOperatableNodeState} from "./state/supported/SupportedOperatableNodeState.ts";
import OperatableNodeDisplayer from "./displayer/OperatableNodeDisplayer.svelte";
import {WithStateNode} from "../../WithStateNode.svelte.ts";
import type {OperatableNodeState} from "./state/OperatableNodeState.ts";
export abstract class OperatableNode<
	InputEdgeCount extends number,
> extends WithStateNode<InputEdgeCount, OperatableNodeState<InputEdgeCount>> {
	public constructor(
		inputEdgeCount: InputEdgeCount,
		name: string,
		operators: readonly Operator<InputEdgeCount>[],
		position: Coordinates,
	) {
		const stepCount = 1;
		super(
			// @ts-expect-error: TODO
			OperatableNodeDisplayer,
			inputEdgeCount,
			name,
			position,
			new ManualInvalidAndNoOperatorOperatableNodeState(stepCount),
		);
		this.operators = operators;
	}
	public doManualSteps(): void {
		this.state = this.state.doManualSteps(this.outputEdges);
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
	public readonly operators: readonly Operator<InputEdgeCount>[];
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
	declare public state: SupportedOperatableNodeState<InputEdgeCount>;
	public unsetOperator(): void {
		this.state = this.state.unsetOperator(this.outputEdges);
	}
	public override invalidateInputImages(): void {
		this.state = this.state.invalidateInputImages(this.outputEdges);
	}
	protected override validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: InputEdgeCount}>,
	): void {
		this.state = this.state.validateInputImages(inputImages, this.outputEdges);
	}
}
