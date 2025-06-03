import type {HandledEdgeBuilder} from "../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import type {WithoutImageEdge} from "../../../../../../edge/implementations/without-image/WithoutImageEdge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedInvalidAndNoOperatorOperatableNodeState} from "../animated-invalid-and-no-operator/AnimatedInvalidAndNoOperatorOperatableNodeState.ts";
import {AnimatedOperatingDoneOperatableNodeState} from "../animated-operating-done/AnimatedOperatingDoneOperatableNodeState.ts";
import {AnimatedOperatingInProgressOperatableNodeState} from "../animated-operating-in-progress/AnimatedOperatingInProgressOperatableNodeState.ts";
import {InstantNoOperatorOperatableNodeState} from "../instant-no-operator/InstantNoOperatorOperatableNodeState.ts";
import {ManualNoOperatorOperatableNodeState} from "../manual-no-operator/ManualNoOperatorOperatableNodeState.ts";
export class AnimatedNoOperatorOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount, WithoutImageEdge> {
	public constructor(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		outputEdges: readonly WithoutImageEdge[],
	) {
		super(outputEdges, "unconfigured");
		this.inputImages = inputImages;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): AnimatedNoOperatorOperatableNodeState<InputImageCount> {
		return new AnimatedNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.intervalId,
			this.intervalIntervalSeconds,
			[...this.outputEdges, builder.buildWithoutImage()],
		);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): AnimatedNoOperatorOperatableNodeState<InputImageCount> {
		return new AnimatedNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
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
	public readonly inputImages: readonly ImageData[]
		& Readonly<{length: InputImageCount}>;
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override invalidateInputImages(): AnimatedInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new AnimatedInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			this.intervalId,
			this.intervalIntervalSeconds,
			this.outputEdges,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override makeInstant(): InstantNoOperatorOperatableNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new InstantNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.outputEdges,
		);
	}
	public override makeManual(
		stepCount: number,
	): ManualNoOperatorOperatableNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new ManualNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
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
	): AnimatedNoOperatorOperatableNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new AnimatedNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
			newIntervalId,
			newIntervalIntervalSeconds,
			this.outputEdges,
		);
	}
	public override setOperator(
		operator: Operator<InputImageCount>,
	):
		| AnimatedOperatingInProgressOperatableNodeState<InputImageCount>
		| AnimatedOperatingDoneOperatableNodeState<InputImageCount> {
		const generator = operator.operate(this.inputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			return new AnimatedOperatingDoneOperatableNodeState<InputImageCount>(
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				operator,
				this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
				generatorResult.value,
			);
		} else {
			return new AnimatedOperatingInProgressOperatableNodeState<InputImageCount>(
				generator,
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				operator,
				this.outputEdges,
				generatorResult.value,
			);
		}
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetOperator(): this {
		return this;
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
	): AnimatedNoOperatorOperatableNodeState<InputImageCount> {
		return new AnimatedNoOperatorOperatableNodeState<InputImageCount>(
			newInputImages,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.outputEdges,
		);
	}
}
