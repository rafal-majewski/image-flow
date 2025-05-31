import {Operator} from "../../../operator/Operator.ts";
export abstract class GeneratorOperator extends Operator<0> {
	public constructor(id: string, name: string) {
		super(id, name);
	}
}
