export function computeModuloKeepingDivisorSign(
	dividend: number,
	divisor: number,
): number {
	return ((dividend % divisor) + divisor) % divisor;
}
