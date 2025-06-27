import type {Component} from "svelte";
import type {NodeId} from "../../../id/NodeId.ts";
import type {OperatorId} from "../../../operator/id/OperatorId.ts";
import {Operator} from "../../../operator/Operator.ts";
export abstract class MappingOperator extends Operator<1> {
	public constructor(
		displayer: Component<{
			readonly operator: MappingOperator;
			readonly onSetOperatorRequest: (operator: MappingOperator) => void;
			readonly nodeId: NodeId;
		}>,
		id: OperatorId,
		name: string,
	) {
		super(displayer, id, name);
	}
}
