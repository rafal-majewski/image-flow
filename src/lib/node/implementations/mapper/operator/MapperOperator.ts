import type {Component} from "svelte";
import type {NodeId} from "../../../id/NodeId.ts";
import type {OperatorId} from "../../../operator/id/OperatorId.ts";
import {Operator} from "../../../operator/Operator.ts";
export abstract class MapperOperator extends Operator<1> {
	public constructor(
		displayer: Component<{
			readonly operator: MapperOperator;
			readonly onSetOperatorRequest: (operator: MapperOperator) => void;
			readonly nodeId: NodeId;
		}>,
		id: OperatorId,
		name: string,
	) {
		super(displayer, id, name);
	}
}
