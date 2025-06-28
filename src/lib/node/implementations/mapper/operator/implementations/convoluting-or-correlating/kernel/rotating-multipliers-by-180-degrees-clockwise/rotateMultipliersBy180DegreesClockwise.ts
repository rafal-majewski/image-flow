import type {KernelMultipliers} from "../multipliers/KernelMultipliers.ts";
export function rotateMultipliersBy180DegreesClockwise(
	multipliers: KernelMultipliers,
): KernelMultipliers {
	return multipliers
		.toReversed()
		.map((row) => row.toReversed()) as unknown as KernelMultipliers;
}
