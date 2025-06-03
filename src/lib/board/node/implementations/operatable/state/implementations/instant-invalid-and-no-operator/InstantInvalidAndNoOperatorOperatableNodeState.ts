import type {HandledEdgeBuilder} from "../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import type {WithoutImageEdge} from "../../../../../../edge/implementations/without-image/WithoutImageEdge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedInvalidAndNoOperatorOperatableNodeState} from "../animated-invalid-and-no-operator/AnimatedInvalidAndNoOperatorOperatableNodeState.ts";
import {InstantInvalidOperatableNodeState} from "../instant-invalid/InstantInvalidOperatableNodeState.ts";
import {InstantNoOperatorOperatableNodeState} from "../instant-no-operator/InstantNoOperatorOperatableNodeState.ts";
import {ManualInvalidAndNoOperatorOperatableNodeState} from "../manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatableNodeState.ts";
export class InstantInvalidAndNoOperatorOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount, WithoutImageEdge> {
	public constructor(outputEdges: readonly WithoutImageEdge[]) {
		super(outputEdges, "unconfigured");
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): InstantInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new InstantInvalidAndNoOperatorOperatableNodeState<InputImageCount>([
			...this.outputEdges,
			builder.buildWithoutImage(),
		]);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): InstantInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new InstantInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			this.outputEdges.filter((edge) => edge !== edgeToBeDeleted),
		);
	}
	public override doAnimatedStep(): this {
		return this;
	}
	public override doManualSteps(): this {
		return this;
	}
	public override invalidateInputImages(): this {
		return this;
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new AnimatedInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			intervalId,
			intervalIntervalSeconds,
			this.outputEdges,
		);
	}
	public override makeInstant(): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			this.outputEdges,
			stepCount,
		);
	}
	public override resetOutputImage(): this {
		return this;
	}
	public override setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override setOperator(
		operator: Operator<InputImageCount>,
	): InstantInvalidOperatableNodeState<InputImageCount> {
		return new InstantInvalidOperatableNodeState<InputImageCount>(
			operator,
			this.outputEdges,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetOperator(): this {
		return this;
	}
	public override validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
	): InstantNoOperatorOperatableNodeState<InputImageCount> {
		return new InstantNoOperatorOperatableNodeState<InputImageCount>(
			inputImages,
			this.outputEdges,
		);
	}
}
