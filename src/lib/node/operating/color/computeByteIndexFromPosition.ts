import type {Coordinates} from "../../../coordinates/Coordinates.ts";
export function computeByteIndexFromPosition(
	position: Coordinates,
	imageWidth: number,
): number {
	return (position.y * imageWidth + position.x) * 4;
}
