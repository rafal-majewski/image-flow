import type {HandledEdgeBuilder} from "../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import type {WithoutImageEdge} from "../../../../../../edge/implementations/without-image/WithoutImageEdge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedNoOperatorOperatableNodeState} from "../animated-no-operator/AnimatedNoOperatorOperatableNodeState.ts";
import {InstantNoOperatorOperatableNodeState} from "../instant-no-operator/InstantNoOperatorOperatableNodeState.ts";
import {ManualInvalidAndNoOperatorOperatableNodeState} from "../manual-invalid-and-no-operator/ManualInvalidAndNoOperatorOperatableNodeState.ts";
import {ManualOperatingDoneOperatableNodeState} from "../manual-operating-done/ManualOperatingDoneOperatableNodeState.ts";
import {ManualOperatingInProgressOperatableNodeState} from "../manual-operating-in-progress/ManualOperatingInProgressOperatableNodeState.ts";
export class ManualNoOperatorOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount, WithoutImageEdge> {
	public constructor(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		outputEdges: readonly WithoutImageEdge[],
		stepCount: number,
	) {
		super(outputEdges, "unconfigured");
		this.inputImages = inputImages;
		this.stepCount = stepCount;
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): ManualNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
			[...this.outputEdges, builder.buildWithoutImage()],
			this.stepCount,
		);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): ManualNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
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
	public readonly inputImages: readonly ImageData[]
		& Readonly<{length: InputImageCount}>;
	public override invalidateInputImages(): ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualInvalidAndNoOperatorOperatableNodeState<InputImageCount>(
			this.outputEdges,
			this.stepCount,
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
	public override makeInstant(): InstantNoOperatorOperatableNodeState<InputImageCount> {
		return new InstantNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
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
	):
		| ManualOperatingInProgressOperatableNodeState<InputImageCount>
		| ManualOperatingDoneOperatableNodeState<InputImageCount> {
		const generator = operator.operate(this.inputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			return new ManualOperatingDoneOperatableNodeState<InputImageCount>(
				this.inputImages,
				operator,
				this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualOperatingInProgressOperatableNodeState<InputImageCount>(
				generator,
				this.inputImages,
				operator,
				this.outputEdges,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	public override setStepCount(
		newStepCount: number,
	): ManualNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.outputEdges,
			newStepCount,
		);
	}
	public readonly stepCount: number;
	public override unsetOperator(): this {
		return this;
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
	): ManualNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualNoOperatorOperatableNodeState<InputImageCount>(
			newInputImages,
			this.outputEdges,
			this.stepCount,
		);
	}
}
