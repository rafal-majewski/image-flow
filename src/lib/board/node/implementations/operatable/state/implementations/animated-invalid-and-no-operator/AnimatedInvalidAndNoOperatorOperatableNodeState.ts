import type {HandledEdgeBuilder} from "../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import type {WithoutImageEdge} from "../../../../../../edge/implementations/without-image/WithoutImageEdge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedInvalidOperatableNodeState} from "../animated-invalid/AnimatedInvalidOperatableNodeState.ts";
import {AnimatedNoOperatorOperatableNodeState} from "../animated-no-operator/AnimatedNoOperatorOperatableNodeState.ts";
import {InstantInvalidAndNoOperatorOperatableNodeState} from "../instant-invalid-and-no-operator/InstantInvalidAndNoOperatorOperatableNodeState.ts";
import {ManualInvalidAndNoOperatorOperatableNodeState} from "../manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatableNodeState.ts";
export class AnimatedInvalidAndNoOperatorOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount, WithoutImageEdge> {
	public constructor(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		outputEdges: readonly WithoutImageEdge[],
	) {
		super(outputEdges, "unconfigured");
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): AnimatedInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new AnimatedInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			this.intervalId,
			this.intervalIntervalSeconds,
			[...this.outputEdges, builder.buildWithoutImage()],
		);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): AnimatedInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new AnimatedInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			this.intervalId,
			this.intervalIntervalSeconds,
			this.outputEdges.filter((edge) => edge !== edgeToBeDeleted),
		);
	}
	public override doAnimatedStep(): this {
		return this;
	}
	public override doManualSteps(): this {
		return this;
	}
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override invalidateInputImages(): this {
		return this;
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override makeInstant(): InstantInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new InstantInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			this.outputEdges,
		);
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
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new AnimatedInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			newIntervalId,
			newIntervalIntervalSeconds,
			this.outputEdges,
		);
	}
	public override setOperator(
		operator: Operator<InputImageCount>,
	): AnimatedInvalidOperatableNodeState<InputImageCount> {
		return new AnimatedInvalidOperatableNodeState<InputImageCount>(
			this.intervalId,
			this.intervalIntervalSeconds,
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
	): AnimatedNoOperatorOperatableNodeState<InputImageCount> {
		return new AnimatedNoOperatorOperatableNodeState<InputImageCount>(
			inputImages,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.outputEdges,
		);
	}
}
