import {SolidColorGeneratorOperator} from "../implementations/SolidColorGeneratorOperator.ts";
import {DiscreteWithAlphaColor} from "../../../../operating/color/DiscreteWithAlphaColor.ts";
import {Dimensions} from "../../../../../dimensions/Dimensions.ts";
export const availableGeneratorOperators = [
	new SolidColorGeneratorOperator(
		new DiscreteWithAlphaColor(255, 0, 0, 255),
		new Dimensions(256, 256),
	),
] as const;
