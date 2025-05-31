import {Operator} from "../../../operator/Operator.ts";
export abstract class MapperOperator extends Operator<1> {
	public constructor(id: string, name: string) {
		super(id, name);
	}
}
