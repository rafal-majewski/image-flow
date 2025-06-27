export function rotateMatrixBy180DegreesClockwise<Element>(
	matrix: readonly (readonly Element[])[],
): readonly (readonly Element[])[] {
	return matrix.toReversed().map((row) => row.toReversed());
}
