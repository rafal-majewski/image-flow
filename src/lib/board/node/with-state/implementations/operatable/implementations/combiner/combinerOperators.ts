import {AddCombinerOperator} from "./operator/implementations/add/AddCombinerOperator.ts";
import {SubtractCombinerOperator} from "./operator/implementations/subtract/SubtractCombinerOperator.ts";
export const combinerOperators = [
	new AddCombinerOperator(),
	new SubtractCombinerOperator(),
] as const;
