import type {Component} from "svelte";
import type {OperatorId} from "./id/OperatorId.ts";
import type {NodeId} from "../id/NodeId.ts";
export abstract class Operator<InputImageCount extends number> {
	protected constructor(
		displayer: Component<{
			operator: Operator<InputImageCount>;
			onSetOperatorRequest(operator: Operator<InputImageCount>): void;
			readonly nodeId: NodeId;
		}>,
		id: OperatorId,
		name: string,
	) {
		this.displayer = displayer;
		this.id = id;
		this.name = name;
	}
	readonly displayer: Component<{
		readonly operator: Operator<InputImageCount>;
		onSetOperatorRequest(operator: Operator<InputImageCount>): void;
		readonly nodeId: NodeId;
	}>;
	readonly id: OperatorId;
	readonly name: string;
	abstract operate(
		inputImages: readonly ImageData[] & {readonly length: InputImageCount},
	): Generator<ImageData, ImageData, void>;
}
