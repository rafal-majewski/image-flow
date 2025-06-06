import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
export function computePixelByteIndexFromPixelPosition(
	pixelPosition: Coordinates,
	imageWidth: number,
): number {
	return (pixelPosition.y * imageWidth + pixelPosition.x) * 4;
}
