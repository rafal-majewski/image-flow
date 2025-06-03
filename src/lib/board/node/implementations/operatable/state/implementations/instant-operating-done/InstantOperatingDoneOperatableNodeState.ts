import type {HandledEdgeBuilder} from "../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import type {WithImageEdge} from "../../../../../../edge/implementations/with-image/WithImageEdge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedOperatingDoneOperatableNodeState} from "../animated-operating-done/AnimatedOperatingDoneOperatableNodeState.ts";
import {InstantInvalidOperatableNodeState} from "../instant-invalid/InstantInvalidOperatableNodeState.ts";
import {InstantNoOperatorOperatableNodeState} from "../instant-no-operator/InstantNoOperatorOperatableNodeState.ts";
import {ManualOperatingDoneOperatableNodeState} from "../manual-operating-done/ManualOperatingDoneOperatableNodeState.ts";
import type {ManualOperatingInProgressOperatableNodeState} from "../manual-operating-in-progress/ManualOperatingInProgressOperatableNodeState.ts";
export class InstantOperatingDoneOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount, WithImageEdge> {
	public constructor(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		operator: Operator<InputImageCount>,
		outputEdges: readonly WithImageEdge[],
		outputImage: ImageData,
	) {
		super(outputEdges, "done");
		this.inputImages = inputImages;
		this.operator = operator;
		this.outputImage = outputImage;
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): InstantOperatingDoneOperatableNodeState<InputImageCount> {
		return new InstantOperatingDoneOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			[...this.outputEdges, builder.buildWithImage(this.outputImage)],
			this.outputImage,
		);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): InstantOperatingDoneOperatableNodeState<InputImageCount> {
		return new InstantOperatingDoneOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			this.outputEdges.filter((edge) => edge !== edgeToBeDeleted),
			this.outputImage,
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
	public override invalidateInputImages(): InstantInvalidOperatableNodeState<InputImageCount> {
		return new InstantInvalidOperatableNodeState<InputImageCount>(
			this.operator,
			this.outputEdges.map((edge) => edge.withoutImage()),
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedOperatingDoneOperatableNodeState<InputImageCount> {
		return new AnimatedOperatingDoneOperatableNodeState<InputImageCount>(
			this.inputImages,
			intervalId,
			intervalIntervalSeconds,
			this.operator,
			this.outputEdges,
			this.outputImage,
		);
	}
	public override makeInstant(): this {
		return this;
	}
	public override makeManual(
		stepCount: number,
	): ManualOperatingDoneOperatableNodeState<InputImageCount> {
		return new ManualOperatingDoneOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			this.outputEdges,
			this.outputImage,
			stepCount,
		);
	}
	public readonly operator: Operator<InputImageCount>;
	public readonly outputImage: ImageData;
	public override resetOutputImage():
		| InstantOperatingDoneOperatableNodeState<InputImageCount>
		| ManualOperatingInProgressOperatableNodeState<InputImageCount> {
		const generator = this.operator.operate(this.inputImages);
		let generatorResult = generator.next();
		while (!generatorResult.done) {
			generatorResult = generator.next();
		}
		return new InstantOperatingDoneOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
			generatorResult.value,
		);
	}
	public override setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override setOperator(
		newOperator: Operator<InputImageCount>,
	): InstantOperatingDoneOperatableNodeState<InputImageCount> {
		const generator = newOperator.operate(this.inputImages);
		let generatorResult = generator.next();
		while (!generatorResult.done) {
			generatorResult = generator.next();
		}
		return new InstantOperatingDoneOperatableNodeState<InputImageCount>(
			this.inputImages,
			newOperator,
			this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
			generatorResult.value,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetOperator(): InstantNoOperatorOperatableNodeState<InputImageCount> {
		return new InstantNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.outputEdges.map((edge) => edge.withoutImage()),
		);
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
	): InstantOperatingDoneOperatableNodeState<InputImageCount> {
		const generator = this.operator.operate(newInputImages);
		let generatorResult = generator.next();
		while (!generatorResult.done) {
			generatorResult = generator.next();
		}
		return new InstantOperatingDoneOperatableNodeState<InputImageCount>(
			newInputImages,
			this.operator,
			this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
			generatorResult.value,
		);
	}
}
