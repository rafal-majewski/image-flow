import type {Coordinates} from "../coordinates/Coordinates.ts";
import type {Edge} from "../edge/Edge.ts";
import type {UnhandledEdgeBuilder} from "../edge/builder/implementations/unhandled/UnhandledEdgeBuilder.ts";
import {WithImageEdge} from "../edge/implementations/WithImageEdge.ts";
import type {WithoutImageEdge} from "../edge/implementations/without-image/WithoutImageEdge.ts";
import {generateNodeId} from "./id/generation/generateNodeId.ts";
import type {Operator} from "./operator/Operator.ts";
import {ManualInvalidAndNoOperatorNodeState} from "./state/implementations/ManualInvalidAndNoOperatorNodeState.ts";
import type {NodeState} from "./state/NodeState.ts";
import type {NodeStatus} from "./status/NodeStatus.ts";
export abstract class Node<InputEdgeCount extends number, Name extends string> {
	public constructor(
		name: Name,
		position: Coordinates,
		requiredInputEdgeCount: InputEdgeCount,
	) {
		this.id = generateNodeId();
		this.inputEdges = new Array(requiredInputEdgeCount).fill(
			null,
		) as unknown as readonly null[] & Readonly<{length: InputEdgeCount}>;
		this.name = name;
		this.position = position;
		this.state = new ManualInvalidAndNoOperatorNodeState([]);
	}
	public readonly name: Name;
	public addOutputEdge(builder: UnhandledEdgeBuilder): void {
		this.state = this.state.addOutputEdge(builder.handleInput(this));
	}
	public doManualSteps(): void {
		this.state = this.state.doManualSteps();
	}
	public readonly id: string;
	/**
	 * Do not assign externally.
	 */
	public inputEdges: readonly (null | WithImageEdge | WithoutImageEdge)[]
		& Readonly<{length: InputEdgeCount}>;
	public makeAnimated(): void {
		const intervalIntervalSeconds = 0.001;
		const intervalId = setInterval(() => {
			this.state = this.state.doAnimatedStep();
		}, intervalIntervalSeconds * 1000);
		this.state = this.state.makeAnimated(intervalId, intervalIntervalSeconds);
	}
	public makeInstant(): void {
		this.state = this.state.makeInstant();
	}
	public makeManual(): void {
		const stepCount = 1;
		this.state = this.state.makeManual(stepCount);
	}
	public get outputEdges(): readonly Edge[] {
		return this.state.outputEdges;
	}
	public position: Coordinates = $state.raw() as Coordinates;
	public resetOutputImage(): void {
		this.state = this.state.resetOutputImage();
	}
	public setInputEdge(inputEdge: Edge): void {
		this.updateInputEdges(
			this.inputEdges.with(inputEdge.index, inputEdge) as unknown as readonly (
				| null
				| WithImageEdge
				| WithoutImageEdge
			)[]
				& Readonly<{length: InputEdgeCount}>,
		);
	}
	public setIntervalInterval(intervalIntervalSeconds: number): void {
		const intervalId = setInterval(() => {
			this.state = this.state.doAnimatedStep();
		}, intervalIntervalSeconds * 1000);
		this.state = this.state.setIntervalInterval(
			intervalId,
			intervalIntervalSeconds,
		);
	}
	public setStepCount(stepCount: number): void {
		this.state = this.state.setStepCount(stepCount);
	}
	/**
	 * Do not reassign externally.
	 */
	public state: NodeState<
		InputEdgeCount,
		readonly WithImageEdge[] | readonly WithoutImageEdge[]
	> = $state.raw() as NodeState<
		InputEdgeCount,
		readonly WithImageEdge[] | readonly WithoutImageEdge[]
	>;
	public get status(): NodeStatus {
		return this.state.status;
	}
	public unsetInputEdge(inputEdgeIndex: number): void {
		this.updateInputEdges(
			this.inputEdges.with(inputEdgeIndex, null) as unknown as readonly (
				| null
				| WithImageEdge
				| WithoutImageEdge
			)[]
				& Readonly<{length: InputEdgeCount}>,
		);
	}
	private updateInputEdges(
		newInputEdges: readonly (null | WithImageEdge | WithoutImageEdge)[]
			& Readonly<{length: InputEdgeCount}>,
	): void {
		this.inputEdges = newInputEdges;
		if (
			this.inputEdges.every(
				(
					edge: WithImageEdge | WithoutImageEdge | null,
				): edge is WithImageEdge =>
					edge !== null && edge instanceof WithImageEdge,
			)
		) {
			this.state = this.state.validateInputImages(
				this.inputEdges.map(
					(edge: WithImageEdge): ImageData => edge.image,
				) as unknown as readonly ImageData[]
					& Readonly<{length: InputEdgeCount}>,
			);
		} else {
			this.state = this.state.invalidateInputImages();
		}
	}
	public setOperator(operator: Operator<InputEdgeCount>): void {
		this.state = this.state.setOperator(operator);
	}
	public unsetOperator(): void {
		this.state = this.state.unsetOperator();
	}
}
