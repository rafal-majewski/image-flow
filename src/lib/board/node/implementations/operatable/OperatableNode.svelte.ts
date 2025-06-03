import type {Coordinates} from "../../../coordinates/Coordinates.ts";
import {WithImageEdge} from "../../../edge/implementations/with-image/WithImageEdge.ts";
import type {WithoutImageEdge} from "../../../edge/implementations/without-image/WithoutImageEdge.ts";
import {Node} from "../../Node.svelte.ts";
import type {Operator} from "./operator/Operator.ts";
import {ManualInvalidAndNoOperatorOperatableNodeState} from "./state/implementations/manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatableNodeState.ts";
import type {SupportedOperatableNodeState} from "./state/supported/SupportedOperatableNodeState.ts";
import OperatableNodeDisplayer from "./displayer/OperatableNodeDisplayer.svelte";
export abstract class OperatableNode<
	InputEdgeCount extends number,
> extends Node<InputEdgeCount> {
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
			new ManualInvalidAndNoOperatorOperatableNodeState([], stepCount),
		);
		this.operators = operators;
	}
	public doManualSteps(): void {
		this.state = this.state.doManualSteps();
	}
	public makeAnimated(): void {
		const intervalIntervalSeconds = 0.001;
		const intervalId = setInterval(() => {
			this.state = this.state.doAnimatedStep();
		}, intervalIntervalSeconds * 1000);
		this.state = this.state.makeAnimated(intervalId, intervalIntervalSeconds);
	}
	public makeInstant(): void {
		this.state = this.state.makeInstant();
	}
	public makeManual(): void {
		const stepCount = 1;
		this.state = this.state.makeManual(stepCount);
	}
	public readonly operators: readonly Operator<InputEdgeCount>[];
	public get outputEdges():
		| readonly WithImageEdge[]
		| readonly WithoutImageEdge[] {
		return this.state.outputEdges;
	}
	public resetOutputImage(): void {
		this.state = this.state.resetOutputImage();
	}
	public setIntervalInterval(intervalIntervalSeconds: number): void {
		const intervalId = setInterval(() => {
			this.state = this.state.doAnimatedStep();
		}, intervalIntervalSeconds * 1000);
		this.state = this.state.setIntervalInterval(
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public setOperator(operator: Operator<InputEdgeCount>): void {
		this.state = this.state.setOperator(operator);
	}
	public setStepCount(stepCount: number): void {
		this.state = this.state.setStepCount(stepCount);
	}
	declare public state: SupportedOperatableNodeState<InputEdgeCount>;
	public unsetOperator(): void {
		this.state = this.state.unsetOperator();
	}
}
