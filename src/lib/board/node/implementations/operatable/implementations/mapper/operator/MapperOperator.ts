import type {Component} from "svelte";
import type {OperatorId} from "../../../operator/id/OperatorId.ts";
import {Operator} from "../../../operator/Operator.ts";
import type {OperatableNodeId} from "../../../../../id/OperatableNodeId.ts";
export abstract class MapperOperator extends Operator<1> {
	public constructor(
		displayer: Component<
			Readonly<{
				operator: MapperOperator;
				onSetOperatorRequest: (operator: MapperOperator) => void;
				nodeId: OperatableNodeId;
			}>
		>,
		id: OperatorId,
		name: string,
	) {
		super(displayer, id, name);
	}
}
