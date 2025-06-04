import type {Component} from "svelte";
import type {OperatorId} from "../../../operator/id/OperatorId.ts";
import {Operator} from "../../../operator/Operator.ts";
import type {OperatableNodeId} from "../../../../../../id/OperatableNodeId.ts";
export abstract class GeneratorOperator extends Operator<0> {
	public constructor(
		displayer: Component<
			Readonly<{
				operator: GeneratorOperator;
				onSetOperatorRequest: (operator: GeneratorOperator) => void;
				nodeId: OperatableNodeId;
			}>
		>,
		id: OperatorId,
		name: string,
	) {
		super(displayer, id, name);
	}
}
