import {Coordinates} from "../../../../../../../../coordinates/Coordinates.ts";
import type {Dimensions} from "../../../../../../../../dimensions/Dimensions.ts";
export function rotateAnchorPositionBy180DegreesClockwise(
	anchorPosition: Coordinates,
	kernelDimensions: Dimensions,
): Coordinates {
	return kernelDimensions
		.convertToCoordinates()
		.subtractCoordinates(new Coordinates(1, 1))
		.subtractCoordinates(anchorPosition);
}
