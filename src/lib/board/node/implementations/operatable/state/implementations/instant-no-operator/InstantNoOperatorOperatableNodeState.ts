import type {HandledEdgeBuilder} from "../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import type {WithoutImageEdge} from "../../../../../../edge/implementations/without-image/WithoutImageEdge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedNoOperatorOperatableNodeState} from "../animated-no-operator/AnimatedNoOperatorOperatableNodeState.ts";
import {InstantInvalidAndNoOperatorOperatableNodeState} from "../instant-invalid-and-no-operator/InstantInvalidAndNoOperatorOperatableNodeState.ts";
import {InstantOperatingDoneOperatableNodeState} from "../instant-operating-done/InstantOperatingDoneOperatableNodeState.ts";
import {ManualNoOperatorOperatableNodeState} from "../manual-no-operator/ManualNoOperatorOperatableNodeState.ts";
export class InstantNoOperatorOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount, WithoutImageEdge> {
	public constructor(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		outputEdges: readonly WithoutImageEdge[],
	) {
		super(outputEdges, "unconfigured");
		this.inputImages = inputImages;
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): InstantNoOperatorOperatableNodeState<InputImageCount> {
		return new InstantNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
			[...this.outputEdges, builder.buildWithoutImage()],
		);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): InstantNoOperatorOperatableNodeState<InputImageCount> {
		return new InstantNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
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
	public override invalidateInputImages(): InstantInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new InstantInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			this.outputEdges,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedNoOperatorOperatableNodeState<InputImageCount> {
		return new AnimatedNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
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
	): ManualNoOperatorOperatableNodeState<InputImageCount> {
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
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override setOperator(
		operator: Operator<InputImageCount>,
	): InstantOperatingDoneOperatableNodeState<InputImageCount> {
		const generator = operator.operate(this.inputImages);
		let generatorResult = generator.next();
		while (!generatorResult.done) {
			generatorResult = generator.next();
		}
		return new InstantOperatingDoneOperatableNodeState<InputImageCount>(
			this.inputImages,
			operator,
			this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
			generatorResult.value,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetOperator(): this {
		return this;
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
	): InstantNoOperatorOperatableNodeState<InputImageCount> {
		return new InstantNoOperatorOperatableNodeState<InputImageCount>(
			newInputImages,
			this.outputEdges,
		);
	}
}
