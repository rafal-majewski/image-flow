import {Dimensions} from "../../../../../dimensions/Dimensions.ts";
import {AdditionCombinerOperator} from "../implementations/addition/AdditionCombinerOperator.ts";
import {InverseDiscreteFourierTransformCombinerOperator} from "../implementations/inverse-discrete-fourier-transform/InverseDiscreteFourierTransformCombinerOperator.ts";
import {SubtractionCombinerOperator} from "../implementations/subtraction/SubtractionCombinerOperator.ts";
export const availableCombinerOperators = [
	new AdditionCombinerOperator(),
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
	new SubtractionCombinerOperator("ignore"),
] as const;
