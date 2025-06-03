import type {HandledEdgeBuilder} from "../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import type {WithoutImageEdge} from "../../../../../../edge/implementations/without-image/WithoutImageEdge.ts";
import type {NodeState} from "../../../../../state/NodeState.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedInvalidOperatableNodeState} from "../animated-invalid/AnimatedInvalidOperatableNodeState.ts";
import {InstantInvalidOperatableNodeState} from "../instant-invalid/InstantInvalidOperatableNodeState.ts";
import {ManualInvalidAndNoOperatorOperatableNodeState} from "../manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatableNodeState.ts";
import {ManualOperatingDoneOperatableNodeState} from "../manual-operating-done/ManualOperatingDoneOperatableNodeState.ts";
import {ManualOperatingInProgressOperatableNodeState} from "../manual-operating-in-progress/ManualOperatingInProgressOperatableNodeState.ts";
export class ManualInvalidOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount, WithoutImageEdge> {
	public constructor(
		operator: Operator<InputImageCount>,
		outputEdges: readonly WithoutImageEdge[],
		stepCount: number,
	) {
		super(outputEdges, "unconfigured");
		this.operator = operator;
		this.stepCount = stepCount;
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): ManualInvalidOperatableNodeState<InputImageCount> {
		return new ManualInvalidOperatableNodeState<InputImageCount>(
			this.operator,
			[...this.outputEdges, builder.buildWithoutImage()],
			this.stepCount,
		);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): ManualInvalidOperatableNodeState<InputImageCount> {
		return new ManualInvalidOperatableNodeState<InputImageCount>(
			this.operator,
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
	): AnimatedInvalidOperatableNodeState<InputImageCount> {
		return new AnimatedInvalidOperatableNodeState<InputImageCount>(
			intervalId,
			intervalIntervalSeconds,
			this.operator,
			this.outputEdges,
		);
	}
	public override makeInstant(): InstantInvalidOperatableNodeState<InputImageCount> {
		return new InstantInvalidOperatableNodeState<InputImageCount>(
			this.operator,
			this.outputEdges,
		);
	}
	public override makeManual(stepCount: number): this {
		return this;
	}
	public readonly operator: Operator<InputImageCount>;
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
		newOperator: Operator<InputImageCount>,
	): ManualInvalidOperatableNodeState<InputImageCount> {
		return new ManualInvalidOperatableNodeState<InputImageCount>(
			newOperator,
			this.outputEdges,
			this.stepCount,
		);
	}
	public override setStepCount(
		newStepCount: number,
	): ManualInvalidOperatableNodeState<InputImageCount> {
		return new ManualInvalidOperatableNodeState<InputImageCount>(
			this.operator,
			this.outputEdges,
			newStepCount,
		);
	}
	public readonly stepCount: number;
	public override unsetOperator(): ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			this.outputEdges,
			this.stepCount,
		);
	}
	public override validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
	):
		| ManualOperatingInProgressOperatableNodeState<InputImageCount>
		| ManualOperatingDoneOperatableNodeState<InputImageCount> {
		const generator = this.operator.operate(inputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			return new ManualOperatingDoneOperatableNodeState<InputImageCount>(
				inputImages,
				this.operator,
				this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualOperatingInProgressOperatableNodeState<InputImageCount>(
				generator,
				inputImages,
				this.operator,
				this.outputEdges,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
}
