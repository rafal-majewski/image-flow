import type {HandledEdgeBuilder} from "../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import type {WithoutImageEdge} from "../../../../../../edge/implementations/without-image/WithoutImageEdge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedInvalidOperatableNodeState} from "../animated-invalid/AnimatedInvalidOperatableNodeState.ts";
import {InstantInvalidAndNoOperatorOperatableNodeState} from "../instant-invalid-and-no-operator/InstantInvalidAndNoOperatorOperatableNodeState.ts";
import {InstantOperatingDoneOperatableNodeState} from "../instant-operating-done/InstantOperatingDoneOperatableNodeState.ts";
import {ManualInvalidOperatableNodeState} from "../manual-invalid/ManualInvalidOperatableNodeState.ts";
export class InstantInvalidOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount, WithoutImageEdge> {
	public constructor(
		operator: Operator<InputImageCount>,
		outputEdges: readonly WithoutImageEdge[],
	) {
		super(outputEdges, "unconfigured");
		this.operator = operator;
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): InstantInvalidOperatableNodeState<InputImageCount> {
		return new InstantInvalidOperatableNodeState<InputImageCount>(
			this.operator,
			[...this.outputEdges, builder.buildWithoutImage()],
		);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): InstantInvalidOperatableNodeState<InputImageCount> {
		return new InstantInvalidOperatableNodeState<InputImageCount>(
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
	public override makeInstant(): this {
		return this;
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
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override setOperator(
		newOperator: Operator<InputImageCount>,
	): InstantInvalidOperatableNodeState<InputImageCount> {
		return new InstantInvalidOperatableNodeState<InputImageCount>(
			newOperator,
			this.outputEdges,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetOperator(): InstantInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new InstantInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			this.outputEdges,
		);
	}
	public override validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
	): InstantOperatingDoneOperatableNodeState<InputImageCount> {
		const generator = this.operator.operate(inputImages);
		let generatorResult = generator.next();
		while (!generatorResult.done) {
			generatorResult = generator.next();
		}
		return new InstantOperatingDoneOperatableNodeState<InputImageCount>(
			inputImages,
			this.operator,
			this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
			generatorResult.value,
		);
	}
}
