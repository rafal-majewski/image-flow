import type {Component} from "svelte";
import {Operator} from "../../../operator/Operator.ts";
import type {OperatableNodeId} from "../../../../../../id/OperatableNodeId.ts";
import type {OperatorId} from "../../../operator/id/OperatorId.ts";
export abstract class CombinerOperator extends Operator<2> {
	public constructor(
		displayer: Component<
			Readonly<{
				operator: CombinerOperator;
				onSetOperatorRequest: (operator: CombinerOperator) => void;
				nodeId: OperatableNodeId;
			}>
		>,
		id: OperatorId,
		name: string,
	) {
		super(displayer, id, name);
	}
}
