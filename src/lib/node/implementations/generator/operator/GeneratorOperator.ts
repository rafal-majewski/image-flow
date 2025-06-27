import type {Component} from "svelte";
import type {NodeId} from "../../../id/NodeId.ts";
import type {OperatorId} from "../../../operator/id/OperatorId.ts";
export abstract class GeneratorOperator extends Operator<0> {
	public constructor(
		displayer: Component<{
			readonly operator: GeneratorOperator;
			readonly onSetOperatorRequest: (operator: GeneratorOperator) => void;
			readonly nodeId: NodeId;
		}>,
		id: OperatorId,
		name: string,
	) {
		super(displayer, id, name);
	}
}
