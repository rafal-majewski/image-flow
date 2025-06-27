import {ColorImageGeneratorOperator} from "./operator/ColorImageGeneratorOperator.ts";
export const generatorOperators = [
	new ColorImageGeneratorOperator("color-image-generator"),
] as const;
