export type KernelMultipliers = readonly [
	readonly [number, ...(readonly number[])],
	...(readonly [number, ...(readonly number[])])[],
];
