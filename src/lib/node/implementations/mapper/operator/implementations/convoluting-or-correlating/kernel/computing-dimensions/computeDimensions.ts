import {Dimensions} from "../../../../../../../../dimensions/Dimensions.ts";
import type {KernelMultipliers} from "../multipliers/KernelMultipliers.ts";
export function computeDimensions(multipliers: KernelMultipliers): Dimensions {
	return new Dimensions(multipliers[0].length, multipliers.length);
}
