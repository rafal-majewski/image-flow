import type {Component} from "svelte";
import type {OperatorId} from "./id/OperatorId.ts";
import type {OperatableNodeId} from "../../../id/OperatableNodeId.ts";
export abstract class Operator<InputImageCount extends number> {
	public constructor(
		displayer: Component<
			Readonly<{
				onSetOperatorRequest: (operator: Operator<InputImageCount>) => void;
				nodeId: OperatableNodeId;
				operator: Operator<InputImageCount>;
			}>
		>,
		id: OperatorId,
		name: string,
	) {
		this.displayer = (...parameters) => {
			// @ts-expect-error: TODO
			parameters[1].operator = this;
			// @ts-expect-error: TODO
			return displayer(...parameters);
		};
		this.id = id;
		this.name = name;
	}
	public readonly displayer: Component<
		Readonly<{
			onSetOperatorRequest: (operator: Operator<InputImageCount>) => void;
			nodeId: OperatableNodeId;
		}>
	>;
	public readonly id: OperatorId;
	public readonly name: string;
	public abstract operate(
		inputImages: readonly ImageData[] & Readonly<{length: InputImageCount}>,
	): Generator<ImageData, ImageData, void>;
}
