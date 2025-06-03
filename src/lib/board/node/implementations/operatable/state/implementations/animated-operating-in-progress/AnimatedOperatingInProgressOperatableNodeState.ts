import type {HandledEdgeBuilder} from "../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import type {WithoutImageEdge} from "../../../../../../edge/implementations/without-image/WithoutImageEdge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedInvalidOperatableNodeState} from "../animated-invalid/AnimatedInvalidOperatableNodeState.ts";
import {AnimatedNoOperatorOperatableNodeState} from "../animated-no-operator/AnimatedNoOperatorOperatableNodeState.ts";
import {AnimatedOperatingDoneOperatableNodeState} from "../animated-operating-done/AnimatedOperatingDoneOperatableNodeState.ts";
import {InstantOperatingDoneOperatableNodeState} from "../instant-operating-done/InstantOperatingDoneOperatableNodeState.ts";
import {ManualOperatingInProgressOperatableNodeState} from "../manual-operating-in-progress/ManualOperatingInProgressOperatableNodeState.ts";
export class AnimatedOperatingInProgressOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount, WithoutImageEdge> {
	public constructor(
		generator: Generator<ImageData, ImageData, void>,
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		operator: Operator<InputImageCount>,
		outputEdges: readonly WithoutImageEdge[],
		outputImage: ImageData,
	) {
		super(outputEdges, "in-progress");
		this.generator = generator;
		this.inputImages = inputImages;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
		this.operator = operator;
		this.outputImage = outputImage;
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): AnimatedOperatingInProgressOperatableNodeState<InputImageCount> {
		return new AnimatedOperatingInProgressOperatableNodeState<InputImageCount>(
			this.generator,
			this.inputImages,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.operator,
			[...this.outputEdges, builder.buildWithoutImage()],
			this.outputImage,
		);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): AnimatedOperatingInProgressOperatableNodeState<InputImageCount> {
		return new AnimatedOperatingInProgressOperatableNodeState<InputImageCount>(
			this.generator,
			this.inputImages,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.operator,
			this.outputEdges.filter((edge) => edge !== edgeToBeDeleted),
			this.outputImage,
		);
	}
	public override doAnimatedStep():
		| AnimatedOperatingDoneOperatableNodeState<InputImageCount>
		| AnimatedOperatingInProgressOperatableNodeState<InputImageCount> {
		const generatorResult = this.generator.next();
		if (generatorResult.done) {
			return new AnimatedOperatingDoneOperatableNodeState<InputImageCount>(
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
				generatorResult.value,
			);
		} else {
			return new AnimatedOperatingInProgressOperatableNodeState<InputImageCount>(
				this.generator,
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				this.outputEdges,
				generatorResult.value,
			);
		}
	}
	public override doManualSteps(): this {
		return this;
	}
	private readonly generator: Generator<ImageData, ImageData, void>;
	public readonly inputImages: readonly ImageData[]
		& Readonly<{length: InputImageCount}>;
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override invalidateInputImages(): AnimatedInvalidOperatableNodeState<InputImageCount> {
		return new AnimatedInvalidOperatableNodeState<InputImageCount>(
			this.intervalId,
			this.intervalIntervalSeconds,
			this.operator,
			this.outputEdges,
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
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
	public override makeManual(
		stepCount: number,
	): ManualOperatingInProgressOperatableNodeState<InputImageCount> {
		return new ManualOperatingInProgressOperatableNodeState<InputImageCount>(
			this.generator,
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
		| AnimatedOperatingDoneOperatableNodeState<InputImageCount>
		| AnimatedOperatingInProgressOperatableNodeState<InputImageCount> {
		const newGenerator = this.operator.operate(this.inputImages);
		const generatorResult = newGenerator.next();
		if (generatorResult.done) {
			return new AnimatedOperatingDoneOperatableNodeState<InputImageCount>(
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
				generatorResult.value,
			);
		}
		return new AnimatedOperatingInProgressOperatableNodeState<InputImageCount>(
			newGenerator,
			this.inputImages,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.operator,
			this.outputEdges,
			generatorResult.value,
		);
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedOperatingInProgressOperatableNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new AnimatedOperatingInProgressOperatableNodeState<InputImageCount>(
			this.generator,
			this.inputImages,
			newIntervalId,
			newIntervalIntervalSeconds,
			this.operator,
			this.outputEdges,
			this.outputImage,
		);
	}
	public override setOperator(
		newOperator: Operator<InputImageCount>,
	):
		| AnimatedOperatingDoneOperatableNodeState<InputImageCount>
		| AnimatedOperatingInProgressOperatableNodeState<InputImageCount> {
		const newGenerator = newOperator.operate(this.inputImages);
		const generatorResult = newGenerator.next();
		if (generatorResult.done) {
			return new AnimatedOperatingDoneOperatableNodeState<InputImageCount>(
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				newOperator,
				this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
				generatorResult.value,
			);
		}
		return new AnimatedOperatingInProgressOperatableNodeState<InputImageCount>(
			newGenerator,
			this.inputImages,
			this.intervalId,
			this.intervalIntervalSeconds,
			newOperator,
			this.outputEdges,
			generatorResult.value,
		);
	}
	public override setStepCount(stepCount: number): this {
		return this;
	}
	public override unsetOperator(): AnimatedNoOperatorOperatableNodeState<InputImageCount> {
		return new AnimatedNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.outputEdges,
		);
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
	):
		| AnimatedOperatingDoneOperatableNodeState<InputImageCount>
		| AnimatedOperatingInProgressOperatableNodeState<InputImageCount> {
		const newGenerator = this.operator.operate(newInputImages);
		const newGeneratorResult = newGenerator.next();
		if (newGeneratorResult.done) {
			return new AnimatedOperatingDoneOperatableNodeState<InputImageCount>(
				newInputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				this.outputEdges.map((edge) =>
					edge.withImage(newGeneratorResult.value),
				),
				newGeneratorResult.value,
			);
		} else {
			return new AnimatedOperatingInProgressOperatableNodeState<InputImageCount>(
				newGenerator,
				newInputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				this.outputEdges,
				newGeneratorResult.value,
			);
		}
	}
}
