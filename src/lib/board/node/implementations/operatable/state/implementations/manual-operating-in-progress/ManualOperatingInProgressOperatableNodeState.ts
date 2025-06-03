import type {HandledEdgeBuilder} from "../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import type {WithoutImageEdge} from "../../../../../../edge/implementations/without-image/WithoutImageEdge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedOperatingInProgressOperatableNodeState} from "../animated-operating-in-progress/AnimatedOperatingInProgressOperatableNodeState.ts";
import {InstantOperatingDoneOperatableNodeState} from "../instant-operating-done/InstantOperatingDoneOperatableNodeState.ts";
import {ManualInvalidOperatableNodeState} from "../manual-invalid/ManualInvalidOperatableNodeState.ts";
import {ManualNoOperatorOperatableNodeState} from "../manual-no-operator/ManualNoOperatorOperatableNodeState.ts";
import {ManualOperatingDoneOperatableNodeState} from "../manual-operating-done/ManualOperatingDoneOperatableNodeState.ts";
export class ManualOperatingInProgressOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount, WithoutImageEdge> {
	public constructor(
		generator: Generator<ImageData, ImageData, void>,
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		operator: Operator<InputImageCount>,
		outputEdges: readonly WithoutImageEdge[],
		outputImage: ImageData,
		stepCount: number,
	) {
		super(outputEdges, "in-progress");
		this.generator = generator;
		this.inputImages = inputImages;
		this.operator = operator;
		this.outputImage = outputImage;
		this.stepCount = stepCount;
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): ManualOperatingInProgressOperatableNodeState<InputImageCount> {
		return new ManualOperatingInProgressOperatableNodeState<InputImageCount>(
			this.generator,
			this.inputImages,
			this.operator,
			[...this.outputEdges, builder.buildWithoutImage()],
			this.outputImage,
			this.stepCount,
		);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): ManualOperatingInProgressOperatableNodeState<InputImageCount> {
		return new ManualOperatingInProgressOperatableNodeState<InputImageCount>(
			this.generator,
			this.inputImages,
			this.operator,
			this.outputEdges.filter((edge) => edge !== edgeToBeDeleted),
			this.outputImage,
			this.stepCount,
		);
	}
	public override doAnimatedStep():
		| ManualOperatingDoneOperatableNodeState<InputImageCount>
		| ManualOperatingInProgressOperatableNodeState<InputImageCount> {
		const generatorResult = this.generator.next();
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
				this.generator,
				this.inputImages,
				this.operator,
				this.outputEdges,
				generatorResult.value,
				this.stepCount,
			);
		}
	}
	public override doManualSteps(): this {
		return this;
	}
	private readonly generator: Generator<ImageData, ImageData, void>;
	public readonly inputImages: readonly ImageData[]
		& Readonly<{length: InputImageCount}>;
	public override invalidateInputImages(): ManualInvalidOperatableNodeState<InputImageCount> {
		return new ManualInvalidOperatableNodeState<InputImageCount>(
			this.operator,
			this.outputEdges,
			this.stepCount,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): AnimatedOperatingInProgressOperatableNodeState<InputImageCount> {
		return new AnimatedOperatingInProgressOperatableNodeState<InputImageCount>(
			this.generator,
			this.inputImages,
			intervalId,
			intervalIntervalSeconds,
			this.operator,
			this.outputEdges,
			this.outputImage,
		);
	}
	public override makeInstant(): InstantOperatingDoneOperatableNodeState<InputImageCount> {
		let generatorResult = this.generator.next();
		while (!generatorResult.done) {
			generatorResult = this.generator.next();
		}
		return new InstantOperatingDoneOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
			generatorResult.value,
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
		const newGenerator = this.operator.operate(this.inputImages);
		const generatorResult = newGenerator.next();
		if (generatorResult.done) {
			return new ManualOperatingDoneOperatableNodeState<InputImageCount>(
				this.inputImages,
				this.operator,
				this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
				generatorResult.value,
				this.stepCount,
			);
		}
		return new ManualOperatingInProgressOperatableNodeState<InputImageCount>(
			newGenerator,
			this.inputImages,
			this.operator,
			this.outputEdges,
			generatorResult.value,
			this.stepCount,
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
	):
		| ManualOperatingDoneOperatableNodeState<InputImageCount>
		| ManualOperatingInProgressOperatableNodeState<InputImageCount> {
		const newGenerator = newOperator.operate(this.inputImages);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			return new ManualOperatingDoneOperatableNodeState<InputImageCount>(
				this.inputImages,
				newOperator,
				this.outputEdges.map((edge) =>
					edge.withImage(newGeneratorResult.value),
				),
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualOperatingInProgressOperatableNodeState<InputImageCount>(
				newGenerator,
				this.inputImages,
				newOperator,
				this.outputEdges,
				newGeneratorResult.value,
				this.stepCount,
			);
		}
	}
	public override setStepCount(
		newStepCount: number,
	): ManualOperatingInProgressOperatableNodeState<InputImageCount> {
		return new ManualOperatingInProgressOperatableNodeState<InputImageCount>(
			this.generator,
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
			this.outputEdges,
			this.stepCount,
		);
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
	):
		| ManualOperatingDoneOperatableNodeState<InputImageCount>
		| ManualOperatingInProgressOperatableNodeState<InputImageCount> {
		const newGenerator = this.operator.operate(newInputImages);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			return new ManualOperatingDoneOperatableNodeState<InputImageCount>(
				newInputImages,
				this.operator,
				this.outputEdges.map((edge) =>
					edge.withImage(newGeneratorResult.value),
				),
				newGeneratorResult.value,
				this.stepCount,
			);
		} else {
			return new ManualOperatingInProgressOperatableNodeState<InputImageCount>(
				newGenerator,
				newInputImages,
				this.operator,
				this.outputEdges,
				newGeneratorResult.value,
				this.stepCount,
			);
		}
	}
}
