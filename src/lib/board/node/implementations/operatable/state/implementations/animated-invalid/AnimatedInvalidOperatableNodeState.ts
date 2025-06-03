import type {HandledEdgeBuilder} from "../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import type {WithoutImageEdge} from "../../../../../../edge/implementations/without-image/WithoutImageEdge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedInvalidAndNoOperatorOperatableNodeState} from "../animated-invalid-and-no-operator/AnimatedInvalidAndNoOperatorOperatableNodeState.ts";
import {AnimatedOperatingDoneOperatableNodeState} from "../animated-operating-done/AnimatedOperatingDoneOperatableNodeState.ts";
import {AnimatedOperatingInProgressOperatableNodeState} from "../animated-operating-in-progress/AnimatedOperatingInProgressOperatableNodeState.ts";
import {InstantInvalidOperatableNodeState} from "../instant-invalid/InstantInvalidOperatableNodeState.ts";
import {ManualInvalidOperatableNodeState} from "../manual-invalid/ManualInvalidOperatableNodeState.ts";
export class AnimatedInvalidOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount, WithoutImageEdge> {
	public constructor(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		operator: Operator<InputImageCount>,
		outputEdges: readonly WithoutImageEdge[],
	) {
		super(outputEdges, "unconfigured");
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
		this.operator = operator;
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): AnimatedInvalidOperatableNodeState<InputImageCount> {
		return new AnimatedInvalidOperatableNodeState<InputImageCount>(
			this.intervalId,
			this.intervalIntervalSeconds,
			this.operator,
			[...this.outputEdges, builder.buildWithoutImage()],
		);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): AnimatedInvalidOperatableNodeState<InputImageCount> {
		return new AnimatedInvalidOperatableNodeState<InputImageCount>(
			this.intervalId,
			this.intervalIntervalSeconds,
			this.operator,
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
	public override makeInstant(): InstantInvalidOperatableNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new InstantInvalidOperatableNodeState<InputImageCount>(
			this.operator,
			this.outputEdges,
		);
	}
	public override makeManual(
		stepCount: number,
	): ManualInvalidOperatableNodeState<InputImageCount> {
		return new ManualInvalidOperatableNodeState<InputImageCount>(
			this.operator,
			this.outputEdges,
			stepCount,
		);
	}
	public readonly operator: Operator<InputImageCount>;
	public override resetOutputImage(): this {
		return this;
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedInvalidOperatableNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new AnimatedInvalidOperatableNodeState<InputImageCount>(
			newIntervalId,
			newIntervalIntervalSeconds,
			this.operator,
			this.outputEdges,
		);
	}
	public override setOperator(
		newOperator: Operator<InputImageCount>,
	): AnimatedInvalidOperatableNodeState<InputImageCount> {
		return new AnimatedInvalidOperatableNodeState<InputImageCount>(
			this.intervalId,
			this.intervalIntervalSeconds,
			newOperator,
			this.outputEdges,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetOperator(): AnimatedInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new AnimatedInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			this.intervalId,
			this.intervalIntervalSeconds,
			this.outputEdges,
		);
	}
	public override validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
	):
		| AnimatedOperatingDoneOperatableNodeState<InputImageCount>
		| AnimatedOperatingInProgressOperatableNodeState<InputImageCount> {
		const generator = this.operator.operate(inputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			return new AnimatedOperatingDoneOperatableNodeState<InputImageCount>(
				inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
				generatorResult.value,
			);
		} else {
			return new AnimatedOperatingInProgressOperatableNodeState<InputImageCount>(
				generator,
				inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				this.outputEdges,
				generatorResult.value,
			);
		}
	}
}
