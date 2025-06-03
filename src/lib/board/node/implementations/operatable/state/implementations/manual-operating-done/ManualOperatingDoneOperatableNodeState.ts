import type {HandledEdgeBuilder} from "../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import type {WithImageEdge} from "../../../../../../edge/implementations/with-image/WithImageEdge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedOperatingDoneOperatableNodeState} from "../animated-operating-done/AnimatedOperatingDoneOperatableNodeState.ts";
import {InstantOperatingDoneOperatableNodeState} from "../instant-operating-done/InstantOperatingDoneOperatableNodeState.ts";
import {ManualInvalidOperatableNodeState} from "../manual-invalid/ManualInvalidOperatableNodeState.ts";
import {ManualNoOperatorOperatableNodeState} from "../manual-no-operator/ManualNoOperatorOperatableNodeState.ts";
import {ManualOperatingInProgressOperatableNodeState} from "../manual-operating-in-progress/ManualOperatingInProgressOperatableNodeState.ts";
export class ManualOperatingDoneOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount, WithImageEdge> {
	public constructor(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		operator: Operator<InputImageCount>,
		outputEdges: readonly WithImageEdge[],
		outputImage: ImageData,
		stepCount: number,
	) {
		super(outputEdges, "done");
		this.inputImages = inputImages;
		this.operator = operator;
		this.outputImage = outputImage;
		this.stepCount = stepCount;
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): ManualOperatingDoneOperatableNodeState<InputImageCount> {
		return new ManualOperatingDoneOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			[...this.outputEdges, builder.buildWithImage(this.outputImage)],
			this.outputImage,
			this.stepCount,
		);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): ManualOperatingDoneOperatableNodeState<InputImageCount> {
		return new ManualOperatingDoneOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			this.outputEdges.filter((edge) => edge !== edgeToBeDeleted),
			this.outputImage,
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
	public override invalidateInputImages(): ManualInvalidOperatableNodeState<InputImageCount> {
		return new ManualInvalidOperatableNodeState<InputImageCount>(
			this.operator,
			this.outputEdges.map((edge) => edge.withoutImage()),
			this.stepCount,
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
	public override makeInstant(): InstantOperatingDoneOperatableNodeState<InputImageCount> {
		return new InstantOperatingDoneOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			this.outputEdges,
			this.outputImage,
		);
	}
	public override makeManual(stepCount: number): this {
		return this;
	}
	public readonly operator: Operator<InputImageCount>;
	public readonly outputImage: ImageData;
	public override resetOutputImage():
		| ManualOperatingDoneOperatableNodeState<InputImageCount>
		| ManualOperatingInProgressOperatableNodeState<InputImageCount> {
		const generator = this.operator.operate(this.inputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			return new ManualOperatingDoneOperatableNodeState<InputImageCount>(
				this.inputImages,
				this.operator,
				this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualOperatingInProgressOperatableNodeState<InputImageCount>(
				generator,
				this.inputImages,
				this.operator,
				this.outputEdges.map((edge) => edge.withoutImage()),
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	public override setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override setOperator(
		newOperator: Operator<InputImageCount>,
	):
		| ManualOperatingDoneOperatableNodeState<InputImageCount>
		| ManualOperatingInProgressOperatableNodeState<InputImageCount> {
		const generator = newOperator.operate(this.inputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			return new ManualOperatingDoneOperatableNodeState<InputImageCount>(
				this.inputImages,
				newOperator,
				this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualOperatingInProgressOperatableNodeState<InputImageCount>(
				generator,
				this.inputImages,
				newOperator,
				this.outputEdges.map((edge) => edge.withoutImage()),
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	public override setStepCount(
		newStepCount: number,
	): ManualOperatingDoneOperatableNodeState<InputImageCount> {
		return new ManualOperatingDoneOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			this.outputEdges,
			this.outputImage,
			newStepCount,
		);
	}
	public readonly stepCount: number;
	public override unsetOperator(): ManualNoOperatorOperatableNodeState<InputImageCount> {
		return new ManualNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.outputEdges.map((edge) => edge.withoutImage()),
			this.stepCount,
		);
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
	):
		| ManualOperatingDoneOperatableNodeState<InputImageCount>
		| ManualOperatingInProgressOperatableNodeState<InputImageCount> {
		const generator = this.operator.operate(newInputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			return new ManualOperatingDoneOperatableNodeState<InputImageCount>(
				newInputImages,
				this.operator,
				this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
				generatorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualOperatingInProgressOperatableNodeState<InputImageCount>(
				generator,
				newInputImages,
				this.operator,
				this.outputEdges.map((edge) => edge.withoutImage()),
				generatorResult.value,
				this.stepCount,
			);
		}
	}
}
