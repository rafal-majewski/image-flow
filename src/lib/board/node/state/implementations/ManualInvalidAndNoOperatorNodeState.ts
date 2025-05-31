import type {HandledEdgeBuilder} from "../../../edge/builder/implementations/handled/HandledEdgeBuilder.ts";
import type {WithoutImageEdge} from "../../../edge/implementations/without-image/WithoutImageEdge.ts";
import type {WithImageEdge} from "../../../edge/WithImageEdge.ts";
import type {Operator} from "../../operator/Operator.ts";
import {NodeState} from "../NodeState.ts";
export class ManualInvalidAndNoOperatorNodeState<
	InputEdgeCount extends number,
> extends NodeState<InputEdgeCount, readonly WithoutImageEdge[]> {
	public constructor(outputEdges: readonly WithoutImageEdge[]) {
		super(outputEdges, "unconfigured");
	}
	public override addOutputEdge(
		builder: HandledEdgeBuilder,
	): ManualInvalidAndNoOperatorNodeState<InputEdgeCount> {
		return new ManualInvalidAndNoOperatorNodeState<InputEdgeCount>([
			...this.outputEdges,
			builder.buildWithoutImage(),
		]);
	}
	public override doAnimatedStep(): this {
		return this;
	}
	public override doManualSteps(): this {
		return this;
	}
	public override invalidateInputImages(): NodeState<
		InputEdgeCount,
		readonly WithoutImageEdge[]
	> {
		throw new Error("Method not implemented.");
	}
	public override makeAnimated(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): NodeState<InputEdgeCount, readonly WithoutImageEdge[]> {
		throw new Error("Method not implemented.");
	}
	public override makeInstant(): NodeState<
		InputEdgeCount,
		readonly WithImageEdge[] | readonly WithoutImageEdge[]
	> {
		throw new Error("Method not implemented.");
	}
	public override makeManual(
		stepCount: number,
	): NodeState<InputEdgeCount, readonly WithoutImageEdge[]> {
		throw new Error("Method not implemented.");
	}
	public override resetOutputImage(): NodeState<
		InputEdgeCount,
		readonly WithImageEdge[] | readonly WithoutImageEdge[]
	> {
		throw new Error("Method not implemented.");
	}
	public override setIntervalInterval(
		intervalId: ReturnType<typeof setInterval>,
		intervalIntervalSeconds: number,
	): NodeState<InputEdgeCount, readonly WithoutImageEdge[]> {
		throw new Error("Method not implemented.");
	}
	public override setOperator(
		operator: Operator<InputEdgeCount>,
	): NodeState<
		InputEdgeCount,
		readonly WithImageEdge[] | readonly WithoutImageEdge[]
	> {
		throw new Error("Method not implemented.");
	}
	public override setStepCount(
		stepCount: number,
	): NodeState<InputEdgeCount, readonly WithoutImageEdge[]> {
		throw new Error("Method not implemented.");
	}
	public override validateInputImages(
		inputImages: readonly ImageData[] & Readonly<{length: InputEdgeCount}>,
	): NodeState<
		InputEdgeCount,
		readonly WithImageEdge[] | readonly WithoutImageEdge[]
	> {
		throw new Error("Method not implemented.");
	}
	public override unsetOperator(): NodeState<
		InputEdgeCount,
		readonly WithoutImageEdge[]
	> {
		throw new Error("Method not implemented.");
	}
}
