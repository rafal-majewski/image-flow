import type {HandledEdgeBuilder} from "../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import type {WithoutImageEdge} from "../../../../../../edge/implementations/without-image/WithoutImageEdge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedInvalidAndNoOperatorOperatableNodeState} from "../animated-invalid-and-no-operator/AnimatedInvalidAndNoOperatorOperatableNodeState.ts";
import {InstantInvalidAndNoOperatorOperatableNodeState} from "../instant-invalid-and-no-operator/InstantInvalidAndNoOperatorOperatableNodeState.ts";
import {ManualInvalidOperatableNodeState} from "../manual-invalid/ManualInvalidOperatableNodeState.ts";
import {ManualNoOperatorOperatableNodeState} from "../manual-no-operator/ManualNoOperatorOperatableNodeState.ts";
export class ManualInvalidAndNoOperatorOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount, WithoutImageEdge> {
	public constructor(
		outputEdges: readonly WithoutImageEdge[],
		stepCount: number,
	) {
		super(outputEdges, "unconfigured");
		this.stepCount = stepCount;
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			[...this.outputEdges, builder.buildWithoutImage()],
			this.stepCount,
		);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			this.outputEdges.filter((edge) => edge !== edgeToBeDeleted),
			this.stepCount,
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
	public override makeInstant(): InstantInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new InstantInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			this.outputEdges,
		);
	}
	public override makeManual(stepCount: number): this {
		return this;
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
	): ManualInvalidOperatableNodeState<InputImageCount> {
		return new ManualInvalidOperatableNodeState<InputImageCount>(
			operator,
			this.outputEdges,
			this.stepCount,
		);
	}
	public override setStepCount(
		newStepCount: number,
	): ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			this.outputEdges,
			newStepCount,
		);
	}
	public readonly stepCount: number;
	public override unsetOperator(): this {
		return this;
	}
	public override validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
	): ManualNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualNoOperatorOperatableNodeState<InputImageCount>(
			inputImages,
			this.outputEdges,
			this.stepCount,
		);
	}
}
