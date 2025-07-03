import {Dimensions} from "../../../dimensions/Dimensions.ts";
import {AddCombinerOperator} from "./operator/implementations/add/AddCombinerOperator.ts";
import {InverseDiscreteFourierTransformCombinerOperator} from "./operator/implementations/InverseDiscreteFourierTransformCombinerOperator/InverseDiscreteFourierTransformCombinerOperator.ts";
import {SubtractCombinerOperator} from "./operator/implementations/subtract/SubtractCombinerOperator.ts";
export const combinerOperators = [
	new AddCombinerOperator(),
	new SubtractCombinerOperator("ignore"),
	new InverseDiscreteFourierTransformCombinerOperator(
		new Dimensions(31, 31),
		1,
		31,
		0,
		31,
		0,
		0,
		1,
	),
] as const;
