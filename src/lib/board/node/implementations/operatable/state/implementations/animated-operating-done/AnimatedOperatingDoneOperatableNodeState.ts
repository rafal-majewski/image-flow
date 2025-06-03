import type {HandledEdgeBuilder} from "../../../../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {Edge} from "../../../../../../edge/Edge.ts";
import type {WithImageEdge} from "../../../../../../edge/implementations/with-image/WithImageEdge.ts";
import type {Operator} from "../../../operator/Operator.ts";
import {OperatableNodeState} from "../../OperatableNodeState.ts";
import {AnimatedInvalidOperatableNodeState} from "../animated-invalid/AnimatedInvalidOperatableNodeState.ts";
import {AnimatedNoOperatorOperatableNodeState} from "../animated-no-operator/AnimatedNoOperatorOperatableNodeState.ts";
import {AnimatedOperatingInProgressOperatableNodeState} from "../animated-operating-in-progress/AnimatedOperatingInProgressOperatableNodeState.ts";
import {InstantOperatingDoneOperatableNodeState} from "../instant-operating-done/InstantOperatingDoneOperatableNodeState.ts";
import {ManualOperatingDoneOperatableNodeState} from "../manual-operating-done/ManualOperatingDoneOperatableNodeState.ts";
export class AnimatedOperatingDoneOperatableNodeState<
	InputImageCount extends number,
> extends OperatableNodeState<InputImageCount, WithImageEdge> {
	public constructor(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
		operator: Operator<InputImageCount>,
		outputEdges: readonly WithImageEdge[],
		outputImage: ImageData,
	) {
		super(outputEdges, "done");
		this.inputImages = inputImages;
		this.intervalId = intervalId;
		this.intervalIntervalSeconds = intervalIntervalSeconds;
		this.operator = operator;
		this.outputImage = outputImage;
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): AnimatedOperatingDoneOperatableNodeState<InputImageCount> {
		return new AnimatedOperatingDoneOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.operator,
			[...this.outputEdges, builder.buildWithImage(this.outputImage)],
			this.outputImage,
		);
	}
	public override deleteOutputEdge(
		edgeToBeDeleted: Edge,
	): AnimatedOperatingDoneOperatableNodeState<InputImageCount> {
		return new AnimatedOperatingDoneOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.intervalId,
			this.intervalIntervalSeconds,
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
	private readonly intervalId: ReturnType<typeof setInterval>;
	public readonly intervalIntervalSeconds: number;
	public override invalidateInputImages(): AnimatedInvalidOperatableNodeState<InputImageCount> {
		return new AnimatedInvalidOperatableNodeState<InputImageCount>(
			this.intervalId,
			this.intervalIntervalSeconds,
			this.operator,
			this.outputEdges.map((edge) => edge.withoutImage()),
		);
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): this {
		return this;
	}
	public override makeInstant(): InstantOperatingDoneOperatableNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new InstantOperatingDoneOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.operator,
			this.outputEdges,
			this.outputImage,
		);
	}
	public override makeManual(
		stepCount: number,
	): ManualOperatingDoneOperatableNodeState<InputImageCount> {
		clearInterval(this.intervalId);
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
		| AnimatedOperatingDoneOperatableNodeState<InputImageCount>
		| AnimatedOperatingInProgressOperatableNodeState<InputImageCount> {
		const generator = this.operator.operate(this.inputImages);
		const generatorResult = generator.next();
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
				generator,
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				this.outputEdges.map((edge) => edge.withoutImage()),
				generatorResult.value,
			);
		}
	}
	public override setIntervalInterval(
		newIntervalId: ReturnType<typeof setInterval>,
		newIntervalIntervalSeconds: number,
	): AnimatedOperatingDoneOperatableNodeState<InputImageCount> {
		clearInterval(this.intervalId);
		return new AnimatedOperatingDoneOperatableNodeState<InputImageCount>(
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
		const generator = newOperator.operate(this.inputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			return new AnimatedOperatingDoneOperatableNodeState<InputImageCount>(
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				newOperator,
				this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
				generatorResult.value,
			);
		} else {
			return new AnimatedOperatingInProgressOperatableNodeState<InputImageCount>(
				generator,
				this.inputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				newOperator,
				this.outputEdges.map((edge) => edge.withoutImage()),
				generatorResult.value,
			);
		}
	}
	public override setStepCount(newStepCount: number): this {
		return this;
	}
	public override unsetOperator(): AnimatedNoOperatorOperatableNodeState<InputImageCount> {
		return new AnimatedNoOperatorOperatableNodeState<InputImageCount>(
			this.inputImages,
			this.intervalId,
			this.intervalIntervalSeconds,
			this.outputEdges.map((edge) => edge.withoutImage()),
		);
	}
	public override validateInputImages(
		newInputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
	):
		| AnimatedOperatingDoneOperatableNodeState<InputImageCount>
		| AnimatedOperatingInProgressOperatableNodeState<InputImageCount> {
		const generator = this.operator.operate(newInputImages);
		const generatorResult = generator.next();
		if (generatorResult.done) {
			return new AnimatedOperatingDoneOperatableNodeState<InputImageCount>(
				newInputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				this.outputEdges.map((edge) => edge.withImage(generatorResult.value)),
				generatorResult.value,
			);
		} else {
			return new AnimatedOperatingInProgressOperatableNodeState<InputImageCount>(
				generator,
				newInputImages,
				this.intervalId,
				this.intervalIntervalSeconds,
				this.operator,
				this.outputEdges.map((edge) => edge.withoutImage()),
				generatorResult.value,
			);
		}
	}
}
