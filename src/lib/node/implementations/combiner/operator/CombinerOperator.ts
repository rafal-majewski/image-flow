import type {Component} from "svelte";
import type {NodeId} from "../../../id/NodeId.ts";
import type {OperatorId} from "../../../operating/operator/id/OperatorId.ts";
import {Operator} from "../../../operating/operator/Operator.ts";
export abstract class CombinerOperator extends Operator<2> {
	public constructor(
		displayer: Component<{
			readonly onSetOperatorRequest: (operator: CombinerOperator) => void;
			readonly nodeId: NodeId;
		}>,
		id: OperatorId,
		name: string,
	) {
		super(displayer, id, name);
	}
}
